import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';

const LOCALES = ['ru', 'kk', 'en'];
import type { Metadata } from 'next';

const BASE_URL = 'https://aipay.kz';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    getBlogSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  return {
    title: `${post.title} | AiPay`,
    description: post.description,
    alternates: { canonical: `${BASE_URL}/${locale}/blog/${slug}` },
  };
}

const backLabel: Record<string, string> = {
  ru: '← Все статьи',
  kk: '← Барлық мақалалар',
  en: '← All posts',
};

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  return (
    <article className="pt-28 lg:pt-36 pb-24">
      <Container>
        <div className="max-w-2xl mx-auto">
          <Link
            href="/blog"
            className="text-sm text-primary-600 hover:underline mb-8 inline-block"
          >
            {backLabel[locale] ?? backLabel.ru}
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-sm text-gray-400 mb-10">{post.date}</p>
          <div className="prose prose-gray max-w-none">
            <MDXRemote source={post.content} />
          </div>
          <div className="mt-16 pt-8 border-t border-gray-200 text-center">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors"
            >
              {locale === 'ru'
                ? 'Попробовать AiPay бесплатно'
                : locale === 'kk'
                ? 'AiPay-ды тегін көріп көру'
                : 'Try AiPay Free'}
            </Link>
          </div>
        </div>
      </Container>
    </article>
  );
}
