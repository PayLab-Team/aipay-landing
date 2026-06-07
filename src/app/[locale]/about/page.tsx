import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui";
import { JsonLd } from "@/components/shared/JsonLd";
import type { Metadata } from "next";

const BASE_URL = "https://www.aipay.kz";
const localeUrl = (l: string) => l === "ru" ? BASE_URL : `${BASE_URL}/${l}`;

const META: Record<string, { title: string; description: string }> = {
  ru: { title: "О нас — AiPay", description: "AiPay автоматизирует Kaspi Pay платежи для бизнеса в Казахстане. Команда, миссия и контакты." },
  en: { title: "About — AiPay", description: "AiPay automates Kaspi Pay payments for businesses in Kazakhstan. Team, mission and contact." },
  kk: { title: "Біз туралы — AiPay", description: "AiPay Қазақстандағы бизнес үшін Kaspi Pay төлемдерін автоматтандырады." },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.ru;
  return { title: meta.title, description: meta.description, alternates: { canonical: `${localeUrl(locale)}/about` } };
}

const L = {
  ru: {
    title: "О AiPay",
    subtitle: "Автоматизация Kaspi Pay для бизнеса в Казахстане",
    mission: "Миссия",
    missionBody: "Мы делаем Kaspi Pay прозрачным и автоматическим. Предприниматели тратят часы на сверку платёжных скриншотов, ручной ввод данных и проверку подлинности платежей. AiPay убирает эту рутину — интеграция за 1 час, автоматическое подтверждение 24/7, webhook для вашей CRM.",
    who: "Кто мы",
    whoBody: "AiPay — команда разработчиков и инженеров из Казахстана. Мы сами прошли путь от ручного контроля платежей до полной автоматизации и создали решение, которое хотим видеть в каждом бизнесе.",
    values: "Наши принципы",
    valueItems: [
      "Прозрачность — мы не управляем деньгами и не делаем исходящие переводы. Только автоматизация и учёт.",
      "Простота — интеграция за 1 час. REST API, документация и sandbox для тестирования.",
      "Надёжность — webhook с retry, idempotency и полная история событий для каждого платежа.",
      "Поддержка — WhatsApp и Telegram, отвечаем быстро, помогаем на каждом этапе.",
    ],
    stack: "Технологии",
    stackBody: "Next.js, TypeScript, REST API, Docker, PostgreSQL. Интеграция с Kaspi Pay, кассовыми сервисами, CRM (AmoCRM, Bitrix24), мессенджерами (Telegram, WhatsApp).",
    contact: "Связаться",
    email: "hello@aipay.kz",
    whatsapp: "WhatsApp: +7 775 522-76-23",
    telegram: "Telegram: @DrJonah",
    office: "Астана, Казахстан",
  },
  en: {
    title: "About AiPay",
    subtitle: "Automating Kaspi Pay for businesses in Kazakhstan",
    mission: "Mission",
    missionBody: "We make Kaspi Pay transparent and automatic. Entrepreneurs spend hours reconciling payment screenshots, manual data entry and verifying payment authenticity. AiPay eliminates this — integration in 1 hour, automatic confirmation 24/7, webhooks for your CRM.",
    who: "Who we are",
    whoBody: "AiPay is a team of developers and engineers from Kazakhstan. We went through the journey from manual payment verification to full automation and built the solution we wish every business had.",
    values: "Our principles",
    valueItems: [
      "Transparency — we don't manage money or make outgoing transfers. Only automation and accounting.",
      "Simplicity — integration in 1 hour. REST API, documentation and sandbox for testing.",
      "Reliability — webhooks with retry, idempotency and full event history for every payment.",
      "Support — WhatsApp and Telegram. We respond quickly and help at every stage.",
    ],
    stack: "Technology Stack",
    stackBody: "Next.js, TypeScript, REST API, Docker, PostgreSQL. Integration with Kaspi Pay, cash register services, CRMs (AmoCRM, Bitrix24), messaging platforms (Telegram, WhatsApp).",
    contact: "Contact",
    email: "hello@aipay.kz",
    whatsapp: "WhatsApp: +7 775 522-76-23",
    telegram: "Telegram: @DrJonah",
    office: "Astana, Kazakhstan",
  },
  kk: {
    title: "AiPay туралы",
    subtitle: "Қазақстандағы бизнес үшін Kaspi Pay автоматтандыру",
    mission: "Миссия",
    missionBody: "Біз Kaspi Pay-ды мөлдір және автоматты етеміз. Кәсіпкерлер төлем скриншоттарын тексеруге, деректерді қолмен енгізуге уақыт жұмсайды. AiPay бұл рутинаны жояды — 1 сағатта интеграция, 24/7 автоматты растау.",
    who: "Біз кімбіз",
    whoBody: "AiPay — Қазақстаннан келген әзірлеушілер мен инженерлер командасы. Біз толық автоматтандыруға дейін жол өттік және әр бизнеске қажет шешім жасадық.",
    values: "Біздің принциптеріміз",
    valueItems: [
      "Мөлдірлік — біз ақшаны басқармаймыз. Тек автоматтандыру және есеп.",
      "Қарапайымдық — 1 сағатта интеграция. REST API, құжаттама және sandbox.",
      "Сенімділік — retry webhook, идемпотенттілік және толық оқиға тарихы.",
      "Қолдау — WhatsApp және Telegram. Тез жауап береміз.",
    ],
    stack: "Технологиялар",
    stackBody: "Next.js, TypeScript, REST API, Docker, PostgreSQL. Kaspi Pay, CRM (AmoCRM, Bitrix24), мессенджерлермен (Telegram, WhatsApp) интеграция.",
    contact: "Байланыс",
    email: "hello@aipay.kz",
    whatsapp: "WhatsApp: +7 775 522-76-23",
    telegram: "Telegram: @DrJonah",
    office: "Астана, Қазақстан",
  },
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = L[locale as keyof typeof L] ?? L.ru;

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AiPay",
    url: BASE_URL,
    description: locale === "en" ? "Automating Kaspi Pay payments for businesses in Kazakhstan" :
                 locale === "kk" ? "Қазақстандағы бизнес үшін Kaspi Pay төлемдерін автоматтандыру" :
                 "Автоматизация Kaspi Pay платежей для бизнеса в Казахстане",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+77755227623",
      contactType: "customer service",
      availableLanguage: ["Russian", "English", "Kazakh"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Astana",
      addressCountry: "KZ",
    },
  };

  return (
    <section className="pt-28 lg:pt-36 pb-24">
      <JsonLd data={orgSchema} />
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{l.title}</h1>
          <p className="text-xl text-gray-500 mb-12">{l.subtitle}</p>

          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{l.mission}</h2>
              <p className="text-gray-600 leading-relaxed">{l.missionBody}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{l.who}</h2>
              <p className="text-gray-600 leading-relaxed">{l.whoBody}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{l.values}</h2>
              <ul className="space-y-3">
                {l.valueItems.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary-600 mt-1.5">—</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{l.stack}</h2>
              <p className="text-gray-600 leading-relaxed">{l.stackBody}</p>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{l.contact}</h2>
              <ul className="space-y-2 text-gray-600">
                <li>{l.email}</li>
                <li>{l.whatsapp}</li>
                <li>{l.telegram}</li>
                <li>{l.office}</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
