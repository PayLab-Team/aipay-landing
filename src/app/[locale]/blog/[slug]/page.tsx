import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Container } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import type { Metadata } from 'next';

const BASE_URL = 'https://aipay.kz';

const LOCALES = ['ru', 'kk', 'en'];

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

const ctaLabel: Record<string, string> = {
  ru: 'Попробовать AiPay бесплатно',
  kk: 'AiPay-ды тегін көріп көру',
  en: 'Try AiPay Free',
};

const tagColors: Record<string, string> = {
  Telegram: 'bg-blue-50 text-blue-700',
  вебхуки: 'bg-violet-50 text-violet-700',
  вебхуктер: 'bg-violet-50 text-violet-700',
  автоматизация: 'bg-green-50 text-green-700',
  автоматтандыру: 'bg-green-50 text-green-700',
  медицина: 'bg-rose-50 text-rose-700',
  предоплата: 'bg-amber-50 text-amber-700',
  Instagram: 'bg-pink-50 text-pink-700',
  мошенничество: 'bg-red-50 text-red-700',
  CRM: 'bg-indigo-50 text-indigo-700',
  интеграция: 'bg-cyan-50 text-cyan-700',
  API: 'bg-slate-100 text-slate-700',
  доставка: 'bg-orange-50 text-orange-700',
  рестораны: 'bg-yellow-50 text-yellow-700',
  разработка: 'bg-teal-50 text-teal-700',
};
const tagClass = (tag: string) => tagColors[tag] ?? 'bg-primary-50 text-primary-700';

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(locale, slug);
  if (!post) notFound();

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(
        locale === 'ru' || locale === 'kk' ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      );
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-gray-50 min-h-screen">
      {/* Article header */}
      <div className="bg-white border-b border-gray-100 pb-10 mb-10">
        <Container>
          <div className="max-w-3xl mx-auto pt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-8 font-medium"
            >
              {backLabel[locale] ?? backLabel.ru}
            </Link>
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-3 py-1 rounded-full font-semibold ${tagClass(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-6">{post.description}</p>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <time>{formatDate(post.date)}</time>
            </div>
          </div>
        </Container>
      </div>

      {/* Article body */}
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-sm">
            <div className="blog-prose">
              <MDXRemote source={post.content} />
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 p-8 md:p-10 text-center text-white shadow-lg">
            <p className="text-xl font-bold mb-2">
              {locale === 'ru' ? 'Готовы автоматизировать Kaspi Pay?' : locale === 'kk' ? 'Kaspi Pay автоматтандыруға дайынсыз ба?' : 'Ready to automate Kaspi Pay?'}
            </p>
            <p className="text-primary-100 mb-6 text-sm">
              {locale === 'ru' ? 'Подключитесь за 1 час. 7 дней бесплатно.' : locale === 'kk' ? '1 сағатта қосылыңыз. 7 күн тегін.' : 'Set up in 1 hour. 7-day free trial.'}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-white text-primary-600 font-semibold hover:bg-primary-50 transition-colors shadow"
            >
              {ctaLabel[locale] ?? ctaLabel.ru}
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
