import { connect } from 'cloudflare:sockets';

const ALLOWED_ORIGIN = /^https:\/\/(www\.)?saharavacation\.com$/;
const SMTP_HOST = 'smtp.gmail.com';
const SMTP_PORT = 465;
const encoder = new TextEncoder();
const decoder = new TextDecoder();

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = request.headers.get('origin') || '';
    const allowOrigin = ALLOWED_ORIGIN.test(origin) ? origin : '';

    if (url.pathname !== '/') {
      return json({ error: 'Not found' }, 404, allowOrigin);
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(allowOrigin),
      });
    }

    if (request.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, allowOrigin);
    }

    if (origin && !allowOrigin) {
      return json({ error: 'Forbidden origin' }, 403, allowOrigin);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ error: 'Invalid JSON' }, 400, allowOrigin);
    }

    const email = String(data.email || '').trim().toLowerCase();
    const name = String(
      data.name || [data.firstName, data.lastName].filter(Boolean).join(' '),
    ).trim();
    const labels = data.labels && typeof data.labels === 'object' ? data.labels : null;

    if (!name || !email) {
      return json({ error: 'Missing required fields' }, 400, allowOrigin);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ error: 'Invalid email address' }, 400, allowOrigin);
    }

    const user = env.GMAIL_USER;
    const pass = env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      console.error('GMAIL_USER / GMAIL_APP_PASSWORD secrets not configured');
      return json({ error: 'Server not configured' }, 500, allowOrigin);
    }

    const notifyTo = env.NOTIFY_TO || 'bouzyanilyas@gmail.com';
    const { subject, html, text } = buildContent({ data, name, email, labels });

    try {
      await sendSmtp({ user, pass, to: notifyTo, replyTo: email, subject, text, html });
    } catch (err) {
      console.error('send failed', JSON.stringify({ message: err.message }));
      return json({ error: 'Failed to send notification email' }, 502, allowOrigin);
    }

    return json({ ok: true }, 200, allowOrigin);
  },
};

function buildContent({ data, name, email, labels }) {
  const rawSubject = String(data.subject || '').trim();
  const subject = rawSubject
    ? `[Sahara Vacation] ${rawSubject}`
    : `[Sahara Vacation] New inquiry: ${name} — ${String(data.tour || 'General').trim()}`;

  if (labels) {
    const entries = Object.entries(labels).filter(([, value]) => String(value ?? '').trim() !== '');
    const rows = entries.map(([label, value]) => {
      const safeValue = escapeHtml(String(value)).replace(/\n/g, '<br>');
      return `<tr><td valign="top"><b>${escapeHtml(label)}</b></td><td>${safeValue}</td></tr>`;
    });
    const html = [
      `<h2>${escapeHtml(name)} — custom journey request from saharavacation.com</h2>`,
      '<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">',
      ...rows,
      '</table>',
      `<p>Reply to: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
    ].join('\n');
    const text = [
      `${name} — custom journey request from saharavacation.com`,
      '',
      ...entries.map(([label, value]) => `${label}: ${String(value)}`),
      '',
      `Reply to: ${email}`,
    ].join('\n');
    return { subject, html, text };
  }

  const firstName = String(data.firstName || '').trim();
  const lastName = String(data.lastName || '').trim();
  const tour = String(data.tour || '').trim();
  const group = String(data.group || '').trim();
  const date = String(data.date || '').trim();
  const phone = String(data.phone || '').trim();
  const message = String(data.message || '').trim();

  const html = [
    '<h2>New Tour Inquiry from saharavacation.com</h2>',
    '<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">',
    `<tr><td><b>First name</b></td><td>${escapeHtml(firstName)}</td></tr>`,
    `<tr><td><b>Last name</b></td><td>${escapeHtml(lastName)}</td></tr>`,
    `<tr><td><b>Email</b></td><td>${escapeHtml(email)}</td></tr>`,
    phone ? `<tr><td><b>Phone</b></td><td>${escapeHtml(phone)}</td></tr>` : '',
    `<tr><td><b>Interested tour</b></td><td>${escapeHtml(tour || 'Not specified')}</td></tr>`,
    group ? `<tr><td><b>Group size</b></td><td>${escapeHtml(group)}</td></tr>` : '',
    date ? `<tr><td><b>Preferred date</b></td><td>${escapeHtml(date)}</td></tr>` : '',
    message
      ? `<tr><td valign="top"><b>Message</b></td><td>${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>`
      : '',
    '</table>',
    `<p>Reply to: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
  ]
    .filter(Boolean)
    .join('\n');

  const text = [
    'New Tour Inquiry from saharavacation.com',
    '',
    `First name: ${firstName}`,
    `Last name: ${lastName}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    `Interested tour: ${tour || 'Not specified'}`,
    group ? `Group size: ${group}` : null,
    date ? `Preferred date: ${date}` : null,
    message ? `Message:\n${message}` : null,
    '',
    `Reply to: ${email}`,
  ]
    .filter((l) => l !== null)
    .join('\n');

  return { subject, html, text };
}

async function sendSmtp({ user, pass, to, replyTo, subject, text, html }) {
  const socket = connect({ hostname: SMTP_HOST, port: SMTP_PORT }, { secureTransport: 'on' });
  try {
    await socket.opened;
  } catch (err) {
    socket.close();
    throw new Error('connect failed: ' + (err && err.message));
  }

  const smtp = new SmtpClient(socket);

  await smtp.expect('220');
  await smtp.send(`EHLO ${SMTP_HOST}`);
  await smtp.expect('250');

  await smtp.send('AUTH LOGIN');
  await smtp.expect('334');
  await smtp.send(btoa(user));
  await smtp.expect('334');
  await smtp.send(btoa(pass));
  await smtp.expect('235');

  await smtp.send(`MAIL FROM:<${user}>`);
  await smtp.expect('250');
  await smtp.send(`RCPT TO:<${to}>`);
  await smtp.expect('250');

  const body = [
    `From: ${user}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : '',
    `Subject: ${encodeHeader(subject)}`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="boun_7f39ab12"',
    '',
    '--boun_7f39ab12',
    'Content-Type: text/plain; charset=utf-8',
    'Content-Transfer-Encoding: quoted-printable',
    '',
    encodeQP(text),
    '--boun_7f39ab12',
    'Content-Type: text/html; charset=utf-8',
    'Content-Transfer-Encoding: quoted-printable',
    '',
    encodeQP(html),
    '--boun_7f39ab12--',
  ]
    .filter((l) => l !== null)
    .join('\r\n');

  await smtp.send('DATA');
  await smtp.expect('354');
  await smtp.send(body);
  await smtp.send('.');
  await smtp.expect('250');

  await smtp.send('QUIT');
  try {
    await smtp.expect('221');
  } catch {
    /* ignore */
  }
  socket.close();
}

class SmtpClient {
  constructor(socket) {
    this.writer = socket.writable.getWriter();
    this.reader = socket.readable.getReader();
    this.buffer = '';
    this.socket = socket;
    this.reading = null;
  }

  async send(line) {
    await this.writer.write(encoder.encode(line + '\r\n'));
  }

  async expect(code) {
    const text = await this.readResponse();
    if (!text.startsWith(String(code))) {
      throw new Error(`SMTP expected ${code}, got: ${text}`);
    }
    return text;
  }

  readResponse() {
    return new Promise((resolve) => {
      this.reading = resolve;
      this.drain();
    });
  }

  async drain() {
    if (!this.reading) return;
    while (this.reading) {
      const nl = this.buffer.indexOf('\n');
      if (nl === -1) {
        const { value, done } = await this.reader.read();
        if (done) {
          this.buffer = '';
          const resolve = this.reading;
          this.reading = null;
          resolve('');
          return;
        }
        this.buffer += decoder.decode(value, { stream: true });
        continue;
      }
      const line = this.buffer.slice(0, nl).replace(/\r$/, '');
      this.buffer = this.buffer.slice(nl + 1);
      const isMulti = line.length >= 4 && line[3] === '-';
      if (!isMulti) {
        const resolve = this.reading;
        this.reading = null;
        resolve(line);
        return;
      }
    }
  }
}

function encodeHeader(str) {
  const quoted = encodeQPWord(str);
  return quoted.length <= 76 ? quoted : '=?UTF-8?B?' + btoa(unescape(encodeURIComponent(str))) + '?=';
}

function encodeQPWord(str) {
  let out = '';
  for (const ch of str) {
    const o = ch.codePointAt(0);
    if (ch === ' ' || (o >= 33 && o <= 126 && ch !== '=')) {
      out += ch;
    } else if (o <= 255) {
      out += '=' + o.toString(16).toUpperCase().padStart(2, '0');
    } else {
      const buf = new TextEncoder().encode(ch);
      for (const b of buf) out += '=' + b.toString(16).toUpperCase().padStart(2, '0');
    }
  }
  return out;
}

function encodeQP(str) {
  let out = '';
  let line = '';
  const push = (s) => {
    if (line.length + s.length > 76) {
      out += line + '=\r\n';
      line = s;
    } else {
      line += s;
    }
  };
  for (const c of str) {
    const o = c.charCodeAt(0);
    if (o >= 32 && o <= 126 && c !== '=') {
      push(c);
    } else {
      push('=' + o.toString(16).toUpperCase().padStart(2, '0'));
    }
  }
  return out + line;
}

function json(body, status, allowOrigin = '') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...corsHeaders(allowOrigin),
    },
  });
}

function corsHeaders(allowOrigin) {
  if (!allowOrigin) return {};
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
