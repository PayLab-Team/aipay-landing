import type { LeadFormData } from '@/schemas/leadForm';

export type LeadStage =
  | 'form_viewed'
  | 'form_started'
  | 'validation_failed'
  | 'submit_attempted'
  | 'submit_success'
  | 'submit_failed'
  | 'form_abandoned';

export interface LeadEventPayload {
  leadId: string;
  stage: LeadStage;
  name?: string;
  phone?: string;
  phoneNormalized?: string | null;
  locale?: string;
  path?: string;
  reason?: string;
  field?: string;
  userAgent?: string;
  submittedAt?: string;
}

export function normalizeKzPhone(phone: unknown): string | null {
  let digits = String(phone || '').replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.length === 11 && digits.startsWith('7')) {
    return digits;
  }

  return null;
}

function compact(value: unknown) {
  if (value === undefined || value === null || value === '') return null;
  return String(value);
}

function stageLabel(stage: LeadStage) {
  switch (stage) {
    case 'form_viewed': return 'Form viewed';
    case 'form_started': return 'Form started';
    case 'validation_failed': return 'Validation failed';
    case 'submit_attempted': return 'Submit attempted';
    case 'submit_success': return 'Lead submitted successfully';
    case 'submit_failed': return 'Lead submit failed';
    case 'form_abandoned': return 'Lead form abandoned';
    default: return stage;
  }
}

export async function sendTelegramText(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials not configured!');
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Telegram sendMessage failed: ${response.status} ${text.slice(0, 300)}`);
  }
}

export async function sendLeadSuccessMessage({ name, phone }: LeadFormData, phoneNormalized?: string) {
  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  const message = [
    'AiPay lead: success',
    '',
    `Stage: ${stageLabel('submit_success')}`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    phoneNormalized ? `Normalized: +${phoneNormalized}` : null,
    `Time: ${submittedAt}`,
  ].filter(Boolean).join('\n');

  await sendTelegramText(message);
}

export async function sendLeadEventMessage(event: LeadEventPayload) {
  const submittedAt = event.submittedAt
    ? new Date(event.submittedAt).toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })
    : new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  const phoneNormalized = event.phoneNormalized ?? normalizeKzPhone(event.phone);

  const message = [
    `AiPay lead: ${event.stage === 'submit_success' ? 'success' : 'not completed'}`,
    '',
    `Stage: ${stageLabel(event.stage)}`,
    compact(event.leadId) ? `Lead ID: ${event.leadId}` : null,
    compact(event.name) ? `Name: ${event.name}` : null,
    compact(event.phone) ? `Phone: ${event.phone}` : null,
    phoneNormalized ? `Normalized: +${phoneNormalized}` : null,
    compact(event.field) ? `Field: ${event.field}` : null,
    compact(event.reason) ? `Reason: ${event.reason}` : null,
    compact(event.locale) ? `Locale: ${event.locale}` : null,
    compact(event.path) ? `Path: ${event.path}` : null,
    `Time: ${submittedAt}`,
  ].filter(Boolean).join('\n');

  await sendTelegramText(message);
}
