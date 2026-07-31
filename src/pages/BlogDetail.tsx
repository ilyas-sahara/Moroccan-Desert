import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';
import { BLOG_POSTS } from '@/data/content';

export default function BlogDetail() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    return (
      <main className="pt-32">
        <div className="container-x py-24 text-center">
          <h1 className="font-display text-4xl text-ink-900">Article not found</h1>
          <Link to="/blog" className="btn-primary mt-8">Back to blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="bg-sand-50 py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sand-700 hover:text-sand-800">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> Back to blog
          </Link>

          <article className="mt-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sand-200/60">
            <img src={post.image} alt={post.title} className="h-80 w-full object-cover" />
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-sand-600">
                <span>{post.category}</span>
                <span className="hidden h-1 w-1 rounded-full bg-sand-300 sm:block" />
                <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" strokeWidth={1.5} />{post.readTime}</span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-medium leading-tight text-ink-900 sm:text-5xl">
                {post.title}
              </h1>
              <p className="mt-4 text-lg text-ink-600">{post.excerpt}</p>

              <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-ink-600">
                <span className="flex items-center gap-2"><UserRound className="h-4 w-4" strokeWidth={1.5} />{post.author}</span>
                <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" strokeWidth={1.5} />{post.publishedAt}</span>
              </div>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-700">
                <p>{post.content}</p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
