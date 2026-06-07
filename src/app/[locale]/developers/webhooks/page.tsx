import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui";
import type { Metadata } from "next";

const BASE_URL = "https://www.aipay.kz";
const localeUrl = (l: string) => l === "ru" ? BASE_URL : `${BASE_URL}/${l}`;

const META: Record<string, { title: string; description: string }> = {
  ru: { title: "Webhook — AiPay Kaspi Pay", description: "Настройте webhook для мгновенных уведомлений о статусах Kaspi Pay оплат. Примеры кода, безопасность, best practices." },
  en: { title: "Webhooks — AiPay Kaspi Pay", description: "Configure webhooks for instant Kaspi Pay payment status notifications. Code examples, security, best practices." },
  kk: { title: "Webhook — AiPay Kaspi Pay", description: "Kaspi Pay төлем статус туралы webhook орнатыңыз." },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.ru;
  return { title: meta.title, description: meta.description, alternates: { canonical: `${localeUrl(locale)}/developers/webhooks` } };
}

const L = {
  ru: {
    title: "Webhook",
    subtitle: "Мгновенные уведомления при смене статуса оплаты",
    desc: "При каждом изменении статуса оплаты AiPay отправляет HTTP POST запрос на ваш URL. Настройте notif_url в настройках компании в Dashboard.",
    setup: "Настройка",
    setupSteps: [
      "Укажите webhook URL (notif_url) в настройках компании в Dashboard",
      "AiPay будет отправлять POST-запросы на этот URL при каждом событии",
      "Отвечайте HTTP 200 для подтверждения получения",
      "При ответе отличном от 200 AiPay выполнит retry с exponential backoff",
    ],
    invoiceEvent: "Пример — Invoice Event",
    deviceEvent: "Пример — Device Event",
    security: "Безопасность",
    securityBody: "Проверяйте подпись запросов для подтверждения подлинности webhook. AiPay подписывает каждый запрос HMAC.",
    bestPractices: "Рекомендации",
    bestPracticeItems: [
      "Обработайте webhook асинхронно и ответьте 200 быстро",
      "Реализуйте идемпотентность — AiPay может отправить событие дважды",
      "Логгируйте все webhook для отладки",
      "Тестируйте в sandbox до перехода на production",
    ],
  },
  en: {
    title: "Webhooks",
    subtitle: "Instant notifications on payment status changes",
    desc: "When a payment status changes, AiPay sends an HTTP POST to your configured URL. Set notif_url in your company settings on the Dashboard.",
    setup: "Setup",
    setupSteps: [
      "Set webhook URL (notif_url) in your company settings on the Dashboard",
      "AiPay will POST to this endpoint on every status change",
      "Respond with HTTP 200 to acknowledge receipt",
      "On non-200 responses, AiPay retries with exponential backoff",
    ],
    invoiceEvent: "Example — Invoice Event",
    deviceEvent: "Example — Device Event",
    security: "Security",
    securityBody: "Verify request signatures to authenticate webhook payloads. AiPay signs every request with HMAC.",
    bestPractices: "Best Practices",
    bestPracticeItems: [
      "Process webhooks asynchronously and respond with 200 quickly",
      "Implement idempotency — AiPay may deliver an event twice",
      "Log all webhooks for debugging",
      "Test in sandbox before going to production",
    ],
  },
  kk: {
    title: "Webhook",
    subtitle: "Төлем статус өзгергенде хабарламалар",
    desc: "AiPay төлем статусы өзгерген сайын HTTP POST жібереді. Company settings-те notif_url орнатыңыз.",
    setup: "Орнату",
    setupSteps: [
      "Dashboard-те company settings-те webhook URL орнатыңыз",
      "AiPay әр статус өзгергенде POST жібереді",
      "HTTP 200 жауап беріңіз",
      "200-ден өзгеше жауап берілсе, AiPay retry жасайды",
    ],
    invoiceEvent: "Invoice оқиғасы мысалы",
    deviceEvent: "Device оқиғасы мысалы",
    security: "Қауіпсіздік",
    securityBody: "Request signature тексеріңіз. AiPay әр request-ті HMAC-пен қол қояды.",
    bestPractices: "Ұсыныстар",
    bestPracticeItems: [
      "Webhook-ты асинхрон өңдеп, тез 200 қайтарыңыз",
      "Идемпотенттілік қосыңыз",
      "Барлық webhook-ты логтаңыз",
      "Sandbox-та тексеріңіз",
    ],
  },
};

const invoicePayload = `{
  "event_type": "invoice_update",
  "timestamp": "2026-06-07T12:00:00Z",
  "user_id": "uuid-here",
  "data": {
    "invoice_id": "uuid-here",
    "status_code": 9,
    "status": "paid",
    "amount": 5000,
    "account": "+770****6543",
    "account_name": "Иван Иванов",
    "message": "Order #123"
  }
}`;

const devicePayload = `{
  "event_type": "device_status",
  "data": {
    "pos_id": "uuid-here",
    "status": "working"
  }
}`;

export default async function WebhooksPage({ params }: Props) {
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

          <h2 className="text-2xl font-bold mb-4">{l.setup}</h2>
          <ol className="space-y-3 mb-10">
            {l.setupSteps.map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-sm font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-gray-700">{s}</span>
              </li>
            ))}
          </ol>

          <h2 className="text-2xl font-bold mb-4">{l.invoiceEvent}</h2>
          <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre">{invoicePayload}</pre>
          </div>

          <h2 className="text-2xl font-bold mb-4">{l.deviceEvent}</h2>
          <div className="bg-gray-900 rounded-xl p-5 mb-10 overflow-x-auto">
            <pre className="text-green-400 text-sm font-mono whitespace-pre">{devicePayload}</pre>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
            <h3 className="font-bold text-gray-900 mb-1">{l.security}</h3>
            <p className="text-gray-600">{l.securityBody}</p>
          </div>

          <h2 className="text-2xl font-bold mb-4">{l.bestPractices}</h2>
          <ul className="space-y-2">
            {l.bestPracticeItems.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-primary-600 mt-1.5">—</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
