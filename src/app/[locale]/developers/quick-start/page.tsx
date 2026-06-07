import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui";
import type { Metadata } from "next";

const BASE_URL = "https://www.aipay.kz";
const localeUrl = (l: string) => l === "ru" ? BASE_URL : `${BASE_URL}/${l}`;

const META: Record<string, { title: string; description: string }> = {
  ru: { title: "Быстрый старт — AiPay Kaspi Pay API", description: "Подключите Kaspi Pay за 1 час: регистрация, sandbox, первый счёт и webhook." },
  en: { title: "Quick Start — AiPay Kaspi Pay API", description: "Connect Kaspi Pay in 1 hour: register, sandbox, first invoice and webhook." },
  kk: { title: "Жылдам бастау — AiPay Kaspi Pay API", description: "1 сағатта Kaspi Pay-ді қосыңыз: тіркелу, sandbox, алғашқы шот және webhook." },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.ru;
  return { title: meta.title, description: meta.description, alternates: { canonical: `${localeUrl(locale)}/developers/quick-start` } };
}

const C = {
  ru: {
    title: "Быстрый старт",
    subtitle: "Подключите Kaspi Pay за 1 час",
    steps: [
      { num: "1", title: "Зарегистрируйтесь", body: "Создайте аккаунт на cabinet.aipay.kz. Получите API-ключ и access token." },
      { num: "2", title: "Попробуйте Sandbox", body: "Sandbox-окружение полностью имитирует production. Создавайте тестовые счета и получайте webhook-события — без реальных денег." },
      { num: "3", title: "Создайте первый счёт", body: 'Отправьте POST /api/v2/invoices с суммой и номером телефона. Клиент получит push в Kaspi.' },
      { num: "4", title: "Настройте webhook", body: "Укажите notif_url в настройках компании. AiPay отправляет HTTP POST при каждом изменении статуса." },
      { num: "5", title: "Перейдите на production", body: "POS-терминал активируется. Первый платёж — готово." },
    ],
    codeTitle: "Создание счёта — Python",
    code: `import requests

response = requests.post(
    "https://core.aipay.kz/api/v2/invoices",
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    json={
        "pos_id": "your-pos-id",
        "account": "+777****4567",
        "amount": 5000,
        "message": "Заказ #123"
    }
)
print(response.json())`,
    nextLink: "/developers/api",
    nextLabel: "API Reference →",
  },
  en: {
    title: "Quick Start",
    subtitle: "Connect Kaspi Pay in 1 hour",
    steps: [
      { num: "1", title: "Register", body: "Create an account at cabinet.aipay.kz. Get your API key and access token." },
      { num: "2", title: "Try Sandbox", body: "The sandbox mirrors production. Create test invoices and receive webhooks — no real money." },
      { num: "3", title: "Create your first invoice", body: "Send POST /api/v2/invoices with amount and customer phone. They get a Kaspi push notification." },
      { num: "4", title: "Configure webhook", body: "Set notif_url in company settings. AiPay sends HTTP POST on every status change." },
      { num: "5", title: "Go live", body: "Your POS terminal activates. Your first real Kaspi Pay transaction is ready." },
    ],
    codeTitle: "Create Invoice — Python",
    code: `import requests

response = requests.post(
    "https://core.aipay.kz/api/v2/invoices",
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    json={
        "pos_id": "your-pos-id",
        "account": "+777****4567",
        "amount": 5000,
        "message": "Order #123"
    }
)
print(response.json())`,
    nextLink: "/developers/api",
    nextLabel: "API Reference →",
  },
  kk: {
    title: "Жылдам бастау",
    subtitle: "1 сағатта Kaspi Pay-ді қосыңыз",
    steps: [
      { num: "1", title: "Тіркеліңіз", body: "cabinet.aipay.kz-де аккаунт жасаңыз. API-кілт пен access token алыңыз." },
      { num: "2", title: "Sandbox-ты байқап көріңіз", body: "Sandbox production-ды толық имитациялайды. Шын ақшасыз тесттік шоттар жасаңыз." },
      { num: "3", title: "Алғашқы шот жасаңыз", body: "POST /api/v2/invoices жіберіңіз. Клиент Kaspi push хабарламасын алады." },
      { num: "4", title: "Webhook орнатыңыз", body: "Company settings-те notif_url көрсетіңіз. AiPay әр статус өзгергенде HTTP POST жібереді." },
      { num: "5", title: "Production-ға өтіңіз", body: "POS-терминалыңыз активті. Бірінші Kaspi Pay төлемі дайын." },
    ],
    codeTitle: "Шот жасау — Python",
    code: `import requests

response = requests.post(
    "https://core.aipay.kz/api/v2/invoices",
    headers={"Authorization": "Bearer YOUR_TOKEN"},
    json={
        "pos_id": "your-pos-id",
        "account": "+777****4567",
        "amount": 5000,
        "message": "Тапсырыс #123"
    }
)
print(response.json())`,
    nextLink: "/developers/api",
    nextLabel: "API Reference →",
  },
};

export default async function QuickStartPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const c = C[locale as keyof typeof C] ?? C.ru;

  return (
    <section className="pt-28 lg:pt-36 pb-24">
      <Container>
        <div className="max-w-3xl mx-auto">
          <p className="text-sm font-medium text-primary-600 mb-3">For Developers</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{c.title}</h1>
          <p className="text-xl text-gray-500 mb-12">{c.subtitle}</p>

          <div className="space-y-8 mb-12">
            {c.steps.map((s) => (
              <div key={s.num} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold flex items-center justify-center text-lg">
                  {s.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 mb-10 overflow-x-auto">
            <p className="text-sm text-gray-400 mb-3">{c.codeTitle}</p>
            <pre className="text-green-400 text-sm font-mono whitespace-pre">{c.code}</pre>
          </div>

          <a href={c.nextLink} className="text-primary-600 font-semibold hover:underline">
            {c.nextLabel}
          </a>
        </div>
      </Container>
    </section>
  );
}
