import { setRequestLocale } from 'next-intl/server';
import { Container } from '@/components/ui';
import { Link } from '@/i18n/navigation';
import { getAllBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';

const BASE_URL = 'https://aipay.kz';

const META: Record<string, { title: string; description: string }> = {
  ru: {
    title: 'Блог AiPay — Автоматизация Kaspi Pay',
    description: 'Кейсы, гайды и советы по автоматизации Kaspi Pay для вашего бизнеса.',
  },
  kk: {
    title: 'AiPay блогы — Kaspi Pay автоматтандыру',
    description: 'Kaspi Pay автоматтандыру бойынша кейстер, нұсқаулықтар және кеңестер.',
  },
  en: {
    title: 'AiPay Blog — Kaspi Pay Automation',
    description: 'Case studies, guides and tips for automating Kaspi Pay for your business.',
  },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.ru;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${BASE_URL}/${locale}/blog` },
  };
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllBlogPosts(locale);

  const labels: Record<string, Record<string, string>> = {
    heading: { ru: 'Блог', kk: 'Блог', en: 'Blog' },
    empty: {
      ru: 'Статьи скоро появятся.',
      kk: 'Мақалалар жақында жарияланады.',
      en: 'Posts coming soon.',
    },
    readMore: { ru: 'Читать', kk: 'Оқу', en: 'Read' },
  };
  const l = (key: string) => labels[key]?.[locale] ?? labels[key]?.ru ?? '';

  return (
    <section className="pt-28 lg:pt-36 pb-24">
      <Container>
        <h1 className="text-4xl font-bold text-gray-900 mb-12">{l('heading')}</h1>
        {posts.length === 0 ? (
          <p className="text-gray-500">{l('empty')}</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-elevation-2 transition-shadow"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-4 line-clamp-3">{post.description}</p>
                <span className="text-sm font-medium text-primary-600">{l('readMore')} →</span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
