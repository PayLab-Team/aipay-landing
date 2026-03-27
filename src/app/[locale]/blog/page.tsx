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

function estimateReadTime(locale: string, index: number): number {
  const times = [5, 7, 6, 8, 5, 9];
  return times[index % times.length];
}

export default async function BlogListPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllBlogPosts(locale);

  const labels: Record<string, Record<string, string>> = {
    heading: { ru: 'Блог', kk: 'Блог', en: 'Blog' },
    subtitle: {
      ru: 'Кейсы, гайды и советы по автоматизации Kaspi Pay',
      kk: 'Kaspi Pay автоматтандыру бойынша кейстер мен нұсқаулықтар',
      en: 'Case studies, guides and tips on automating Kaspi Pay',
    },
    empty: {
      ru: 'Статьи скоро появятся.',
      kk: 'Мақалалар жақында жарияланады.',
      en: 'Posts coming soon.',
    },
    readMore: { ru: 'Читать статью', kk: 'Мақаланы оқу', en: 'Read article' },
    minRead: { ru: 'мин', kk: 'мин', en: 'min' },
  };
  const l = (key: string) => labels[key]?.[locale] ?? labels[key]?.ru ?? '';

  const tagColors: Record<string, string> = {
    Telegram: 'bg-blue-50 text-blue-700',
    вебхуки: 'bg-violet-50 text-violet-700',
    вебхуктер: 'bg-violet-50 text-violet-700',
    автоматизация: 'bg-green-50 text-green-700',
    автоматтандыру: 'bg-green-50 text-green-700',
    медицина: 'bg-rose-50 text-rose-700',
    медицина2: 'bg-rose-50 text-rose-700',
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
  const tagClass = (tag: string) =>
    tagColors[tag] ?? 'bg-primary-50 text-primary-700';

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString(
        locale === 'kk' ? 'ru-RU' : locale === 'ru' ? 'ru-RU' : 'en-US',
        { day: 'numeric', month: 'long', year: 'numeric' }
      );
    } catch {
      return dateStr;
    }
  };

  if (posts.length === 0) {
    return (
      <section className="pt-28 lg:pt-36 pb-24">
        <Container>
          <p className="text-gray-500">{l('empty')}</p>
        </Container>
      </section>
    );
  }

  const [featured, ...rest] = posts;

  return (
    <section className="pt-28 lg:pt-36 pb-24">
      <Container>
        {/* Header */}
        <div className="mb-14">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{l('heading')}</h1>
          <p className="text-lg text-gray-500">{l('subtitle')}</p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-10 flex flex-col md:flex-row gap-8 bg-white rounded-3xl border border-gray-200 p-8 hover:shadow-lg transition-shadow overflow-hidden relative"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 to-primary-400 rounded-t-3xl" />
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                {featured.tags.map((tag) => (
                  <span key={tag} className={`text-xs px-3 py-1 rounded-full font-medium ${tagClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-500 text-base leading-relaxed line-clamp-3">{featured.description}</p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-semibold text-primary-600 group-hover:underline">
                {l('readMore')} →
              </span>
              <span className="text-xs text-gray-400">{formatDate(featured.date)}</span>
              <span className="text-xs text-gray-400">· {estimateReadTime(locale, 0)} {l('minRead')} чтения</span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-primary-200 transition-all overflow-hidden relative"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary-400 to-primary-300 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span key={tag} className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${tagClass(tag)}`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-500 mb-5 line-clamp-2 leading-relaxed">{post.description}</p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-400">{formatDate(post.date)}</span>
                <span className="text-xs font-semibold text-primary-600 group-hover:underline">
                  {l('readMore')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
