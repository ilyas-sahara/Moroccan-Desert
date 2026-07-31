import { Link } from 'react-router-dom';
import SectionHeading from '@/components/SectionHeading';
import { BLOG_POSTS } from '@/data/content';

export default function Blog() {
  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/33566021/pexels-photo-33566021.jpeg?auto=compress&cs=tinysrgb&w=2000"
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading
            light
            eyebrow="Journal"
            title="Stories from the Sahara"
            subtitle="Editorial notes, lightweight planning guides, and the kind of travel writing that helps guest expectations meet reality."
          />
        </div>
      </section>

      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="container-x grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/60">
              <img src={post.image} alt={post.title} className="h-56 w-full object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-sand-600">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-sand-300" />
                  <span>{post.readTime}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-medium text-ink-900">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-600">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-sand-500">{post.author}</p>
                    <p className="mt-1 text-xs text-sand-600">{post.publishedAt}</p>
                  </div>
                  <Link to={`/blog/${post.slug}`} className="btn-ghost !px-4 !py-2 !text-xs">
                    Read article
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
