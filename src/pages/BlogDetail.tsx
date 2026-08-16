import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CalendarDays, Clock3, UserRound } from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '@/data/content';
import { useLocale } from '@/i18n';
import { useSeo, SITE_URL } from '@/hooks/useSeo';
import { getCmsBlogPosts } from '@/data/cms';
import JsonLd from '@/components/JsonLd';

export default function BlogDetail() {
  const { slug } = useParams();
  const { t } = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const post = posts.find((item) => item.slug === slug);

  useSeo({
    title: post ? t('seo.articleTitle', { title: post.title }) : t('seo.notFoundTitle'),
    description: post ? t('seo.articleDescription', { excerpt: post.excerpt }) : t('seo.notFoundDescription'),
    path: post ? `/blog/${post.slug}` : '/blog',
    image: post?.image,
    type: 'article',
  });

  useEffect(() => {
    void (async () => {
      const cmsPosts = await getCmsBlogPosts();
      setPosts(cmsPosts);
    })();
  }, []);

  if (!post) {
    return (
      <main className="pt-32">
        <div className="container-x py-24 text-center">
          <h1 className="font-display text-4xl text-ink-900">{t('blog.articleNotFound')}</h1>
          <Link to="/blog" className="btn-primary mt-8">{t('blog.backToBlog')}</Link>
        </div>
      </main>
    );
  }

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    url: `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Saharavacation',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}${import.meta.env.BASE_URL.replace(/\/$/, '')}/favicon.svg`,
      },
    },
  };

  return (
    <main className="pt-20">
      <JsonLd data={blogPosting} />
      <section className="bg-sand-50 py-12 lg:py-16">
        <div className="container-x max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-sand-700 hover:text-sand-800">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} /> {t('blog.backToBlog')}
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
