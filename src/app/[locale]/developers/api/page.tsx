import { setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui";
import type { Metadata } from "next";

const BASE_URL = "https://www.aipay.kz";
const localeUrl = (l: string) => l === "ru" ? BASE_URL : `${BASE_URL}/${l}`;

const META: Record<string, { title: string; description: string }> = {
  ru: { title: "API Reference — AiPay Kaspi Pay REST API", description: "Полная документация REST API: аутентификация, счета, платежи, webhook, терминалы." },
  en: { title: "API Reference — AiPay Kaspi Pay REST API", description: "Complete REST API documentation: authentication, invoices, payments, webhooks, terminals." },
  kk: { title: "API Reference — AiPay Kaspi Pay REST API", description: "REST API толық құжаттама: аутентификация, шоттар, төлемдер, webhook, терминалдар." },
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = META[locale] ?? META.ru;
  return { title: meta.title, description: meta.description, alternates: { canonical: `${localeUrl(locale)}/developers/api` } };
}

const endpoints = [
  { method: "POST", path: "/api/v2/invoices", ru: "Создать счёт", en: "Create invoice" },
  { method: "GET", path: "/api/v2/invoices/:id", ru: "Статус счёта", en: "Get invoice status" },
  { method: "PUT", path: "/api/v2/invoices/:id/cancel", ru: "Отменить счёт", en: "Cancel invoice" },
  { method: "PUT", path: "/api/v2/invoices/:id/refund", ru: "Возврат средств", en: "Refund" },
  { method: "GET", path: "/api/v2/invoices/:id/events", ru: "События счёта", en: "Invoice events" },
  { method: "GET", path: "/api/v2/invoices", ru: "Список счетов", en: "List invoices" },
  { method: "GET", path: "/api/v2/pos", ru: "Список терминалов", en: "List terminals" },
  { method: "POST", path: "/api/v2/pos", ru: "Заявить терминал", en: "Claim terminal" },
  { method: "PUT", path: "/api/v2/pos/:id/pause", ru: "Пауза терминала", en: "Pause terminal" },
  { method: "PUT", path: "/api/v2/pos/:id/resume", ru: "Возобновить терминал", en: "Resume terminal" },
  { method: "POST", path: "/api/v2/auth/login", ru: "Авторизация", en: "Login" },
  { method: "POST", path: "/api/v2/auth/register", ru: "Регистрация", en: "Register" },
  { method: "GET", path: "/api/v2/companies", ru: "Список компаний", en: "List companies" },
];

const statusCodes = [
  { code: 1, status: "created", ru: "Создан" },
  { code: 2, status: "pending", ru: "Отправлен на терминал" },
  { code: 3, status: "no_account", ru: "Нет аккаунта Kaspi" },
  { code: 5, status: "canceled", ru: "Отменён (система)" },
  { code: 7, status: "expired", ru: "Истёк" },
  { code: 8, status: "canceled", ru: "Отменён (пользователь)" },
  { code: 9, status: "paid", ru: "Оплачен" },
  { code: 11, status: "refunded", ru: "Возврат выполнен" },
  { code: 12, status: "rejected", ru: "Отклонён" },
];

const L = {
  ru: { title: "API Reference", subtitle: "REST API для интеграции Kaspi Pay", auth: "Аутентификация", authBody: "JWT Bearer token. Получите через POST /api/v2/auth/login или register. Передавайте как Authorization: Bearer *** в заголовках.", endpoints: "Эндпоинты", statuses: "Статусы счетов", docsLink: "Интерактивная документация", openapi: "OpenAPI spec" },
  en: { title: "API Reference", subtitle: "REST API for Kaspi Pay integration", auth: "Authentication", authBody: "JWT Bearer token. Obtain via POST /api/v2/auth/login or register. Pass as Authorization: Bearer *** in headers.", endpoints: "Endpoints", statuses: "Invoice Status Codes", docsLink: "Interactive documentation", openapi: "OpenAPI spec" },
  kk: { title: "API Reference", subtitle: "Kaspi Pay интеграция REST API", auth: "Аутентификация", authBody: "JWT Bearer token. POST /api/v2/auth/login арқылы алыңыз. Authorization: Bearer *** header-де жіберіңіз.", endpoints: "Эндпоинттер", statuses: "Шот статус коды", docsLink: "Толық құжаттама", openapi: "OpenAPI spec" },
};

export default async function ApiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = L[locale as keyof typeof L] ?? L.ru;
  const isRu = locale !== "en";

  return (
    <section className="pt-28 lg:pt-36 pb-24">
      <Container>
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-primary-600 mb-3">For Developers</p>
          <h1 className="text-5xl font-bold text-gray-900 mb-3">{l.title}</h1>
          <p className="text-xl text-gray-500 mb-12">{l.subtitle}</p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10">
            <h3 className="font-bold text-gray-900 mb-1">{l.auth}</h3>
            <p className="text-gray-600">{l.authBody}</p>
          </div>

          <h2 className="text-2xl font-bold mb-4">{l.endpoints}</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
            <div className="divide-y divide-gray-100">
              {endpoints.map((ep) => (
                <div key={ep.path} className="flex items-center gap-4 px-5 py-3.5 font-mono text-sm">
                  <span className={`inline-block w-16 text-sm font-bold ${
                    ep.method === "GET" ? "text-green-600" : ep.method === "POST" ? "text-blue-600" : "text-amber-600"
                  }`}>{ep.method}</span>
                  <span className="text-gray-900 flex-1">{ep.path}</span>
                  <span className="text-gray-500 hidden md:block">{isRu ? ep.ru : ep.en}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-4">{l.statuses}</h2>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-10">
            <div className="divide-y divide-gray-100">
              {statusCodes.map((s) => (
                <div key={s.code} className="flex items-center gap-4 px-5 py-3">
                  <span className="inline-block w-10 font-mono text-sm font-bold text-gray-700">{s.code}</span>
                  <span className="text-gray-900 font-medium">{s.status}</span>
                  <span className="text-gray-500">{s.ru}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a href="https://cabinet.aipay.kz/doc" className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition">{l.docsLink}</a>
            <a href="https://core.aipay.kz/api/v2/openapi.yaml" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition">{l.openapi}</a>
          </div>
        </div>
      </Container>
    </section>
  );
}
