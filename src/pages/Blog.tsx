import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/SectionHeading';
import { BLOG_POSTS, type BlogPost } from '@/data/content';
import { useLocale } from '@/i18n';
import { useSeo } from '@/hooks/useSeo';
import { getCmsBlogPosts } from '@/data/cms';
import { responsiveImage } from '@/utils/responsiveImage';

export default function Blog() {
  const { t } = useLocale();
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const headerImg = responsiveImage('https://images.pexels.com/photos/33566021/pexels-photo-33566021.jpeg', {
    sizes: '100vw',
    baseWidth: 1600,
    widths: [640, 1200, 1600],
  });

  useSeo({
    title: t('seo.blogTitle'),
    description: t('seo.blogDescription'),
    path: '/blog',
  });

  useEffect(() => {
    void (async () => {
      const cmsPosts = await getCmsBlogPosts();
      setPosts(cmsPosts);
    })();
  }, []);

  return (
    <main className="pt-20">
      <section className="relative overflow-hidden bg-ink-950 py-24 text-sand-50 lg:py-32">
        <div className="absolute inset-0">
          <img
            src={headerImg.src}
            srcSet={headerImg.srcSet}
            sizes={headerImg.sizes}
            alt=""
            className="h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/50 to-ink-950/80" />
        </div>
        <div className="container-x relative z-10">
          <SectionHeading
            light
            eyebrow={t('blog.eyebrow')}
            title={t('blog.title')}
            subtitle={t('blog.subtitle')}
          />
        </div>
      </section>

      <section className="bg-sand-50 py-16 lg:py-24">
        <div className="container-x grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200/60">
              <img src={responsiveImage(post.image, { sizes: '(min-width:1280px) 30vw, (min-width:640px) 45vw, 92vw' }).src} srcSet={responsiveImage(post.image, { sizes: '(min-width:1280px) 30vw, (min-width:640px) 45vw, 92vw' }).srcSet} alt={post.title} className="h-56 w-full object-cover" />
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
                    {t('common.readArticle')}
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
