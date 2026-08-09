/* Enhance the Decap media library modal with inline video previews.
 * The built-in media library only renders thumbnails for images; video files
 * appear as a generic file-type icon. This script replaces that icon with a
 * real <video> element (first frame + inline player) for known video files.
 */
(function () {
  if (!window.CMS) return;

  var adminBase = window.location.pathname.replace(/\/admin\/.*$/, '');
  var MEDIA_PREFIX = adminBase + '/assets/images/';
  var VIDEO_RE = /\.(mp4|webm|ogv|ogg|m4v|mov)(\?.*)?$/i;

  function isVideo(name) {
    return VIDEO_RE.test(name || '');
  }

  function enhanceIcon(icon) {
    var wrapper = icon.parentElement;
    if (!wrapper) return;
    var card = wrapper.parentElement;
    if (!card) return;

    var textEl = card.querySelector('p');
    var fileName = textEl ? textEl.textContent.trim() : '';
    if (!isVideo(fileName)) return;
    if (icon.getAttribute('data-video-preview') === '1') return;
    icon.setAttribute('data-video-preview', '1');

    icon.style.cssText =
      'padding:0; font-size:0; overflow:hidden; position:relative; background:#0b0d10;';

    var video = document.createElement('video');
    video.src = MEDIA_PREFIX + encodeURIComponent(fileName);
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.setAttribute('controls', '');
    video.style.cssText = 'width:100%; height:100%; object-fit:cover; display:block;';
    video.title = fileName;
    icon.appendChild(video);
  }

  function scan() {
    var icons = document.querySelectorAll('[data-testid="card-file-icon"]');
    for (var i = 0; i < icons.length; i++) {
      var el = icons[i];
      if (el.getAttribute('data-video-preview') === '1') continue;
      enhanceIcon(el);
    }
  }

  var observer = new MutationObserver(scan);
  observer.observe(document.body, { childList: true, subtree: true });
  scan();
})();
