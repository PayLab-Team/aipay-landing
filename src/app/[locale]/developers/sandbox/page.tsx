import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui";
import type { Metadata } from "next";

const BASE_URL = "https://www.aipay.kz";
const localeUrl = (l: string) => l === "ru" ? BASE_URL : `${BASE_URL}/${l}`;

const META: Record<string, { title: string; description: string }> = {
  ru: { title: "Sandbox — AiPay Kaspi Pay API", description: "Тестируйте Kaspi Pay интеграцию без реальных денег. Sandbox-окружение, тестовые счета и webhook." },
  en: { title: "Sandbox — AiPay Kaspi Pay API", description: "Test Kaspi Pay integration without real money. Sandbox environment, test invoices and webhooks." },
  kk: { title: "Sandbox — AiPay Kaspi Pay API", description: "Шын ақшасыз Kaspi Pay интеграциясын тестілеңіз." },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.ru;
  return { title: meta.title, description: meta.description, alternates: { canonical: `${localeUrl(locale)}/developers/sandbox` } };
}

const L = {
  ru: {
    title: "Sandbox",
    subtitle: "Тестируйте интеграцию без реальных денег",
    desc: "Sandbox-окружение полностью имитирует production. Все endpoint'ы идентичны, но платежи эмулируются. Создавайте тестовые счета, получайте webhook-события — без реальных денег.",
    features: "Возможности Sandbox",
    featureItems: [
      "Те же endpoint'ы, что и production — POST /api/v2/invoices и др.",
      "Эмуляция Kaspi Pay push-уведомлений",
      "Webhook-события в реальном времени",
      "Тестовые статусы: created, pending, paid, expired, rejected",
      "Не ограничено по количеству запросов",
    ],
    getStarted: "Как начать",
    steps: [
      "Зарегистрируйтесь на cabinet.aipay.kz",
      "Получите sandbox-токен в настройках",
      "Используйте те же API-эндпоинты с sandbox-токеном",
      "Создайте тестовый счёт и проверьте webhook",
    ],
  },
  en: {
    title: "Sandbox",
    subtitle: "Test integration without real money",
    desc: "The sandbox environment mirrors production. All endpoints are identical, but payments are emulated. Create test invoices and receive webhooks — no real money involved.",
    features: "Sandbox Features",
    featureItems: [
      "Same endpoints as production — POST /api/v2/invoices etc.",
      "Emulated Kaspi Pay push notifications",
      "Real-time webhook events",
      "Test statuses: created, pending, paid, expired, rejected",
      "Unlimited request quota",
    ],
    getStarted: "How to get started",
    steps: [
      "Register at cabinet.aipay.kz",
      "Get your sandbox token from settings",
      "Use the same API endpoints with your sandbox token",
      "Create a test invoice and verify webhooks",
    ],
  },
  kk: {
    title: "Sandbox",
    subtitle: "Шын ақшасыз интеграцияны тестілеңіз",
    desc: "Sandbox production-ды толық имитациялайды. Барлық endpoint'тар бірдей, бірақ төлемдер эмуляцияланады.",
    features: "Sandbox мүмкіндіктері",
    featureItems: [
      "Production-мен бірдей endpoint'тар",
      "Kaspi Pay push хабарламаларын эмуляция",
      "Real-time webhook оқиғалары",
      "Тесттік статустар: created, pending, paid, expired, rejected",
      "Шексіз сұраныс лимиті",
    ],
    getStarted: "Қалай бастау керек",
    steps: [
      "cabinet.aipay.kz-де тіркеліңіз",
      "Settings-тен sandbox token алыңыз",
      "Сол API endpoint'тарды sandbox token-мен қолданыңыз",
      "Тесттік шот жасап, webhook-ты тексеріңіз",
    ],
  },
};

export default async function SandboxPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = L[locale as keyof typeof L] ?? L.ru;

  return (
    <section className="pt-28 lg:pt-36 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-primary-600 mb-3">For Developers</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{l.title}</h1>
          <p className="text-xl text-gray-500 mb-12">{l.subtitle}</p>

          <p className="text-gray-600 leading-relaxed mb-10">{l.desc}</p>

          <h2 className="text-2xl font-bold mb-4">{l.features}</h2>
          <ul className="space-y-3 mb-10">
            {l.featureItems.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-green-600 mt-1.5">✓</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mb-4">{l.getStarted}</h2>
          <ol className="space-y-3">
            {l.steps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-gray-700">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
