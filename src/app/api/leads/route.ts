import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema, type LeadFormData } from '@/schemas/leadForm';

function normalizeKzPhone(phone: unknown): string | null {
  let digits = String(phone || '').replace(/\D/g, '');

  if (digits.length === 11 && digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }

  if (digits.length === 11 && digits.startsWith('7')) {
    return digits;
  }

  return null;
}

async function sendTelegramMessage({ name, phone }: LeadFormData, phoneNormalized?: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials not configured!');
    return;
  }

  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  const message = [
    '📱 New Lead!',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    phoneNormalized ? `Normalized: +${phoneNormalized}` : null,
    `Time: ${submittedAt}`,
  ].filter(Boolean).join('\n');

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
}

async function notifyLeadAutomation({ name, phone }: LeadFormData, phoneNormalized: string) {
  const webhookUrl = process.env.LEAD_AUTOMATION_WEBHOOK_URL;
  const secret = process.env.LEAD_AUTOMATION_SECRET;

  if (!webhookUrl || !secret) {
    return { skipped: true, reason: 'LEAD_AUTOMATION_WEBHOOK_URL or LEAD_AUTOMATION_SECRET is not configured' };
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-AIPAY-SECRET': secret,
    },
    body: JSON.stringify({
      source: 'aipay-landing',
      name,
      phone,
      phone_normalized: phoneNormalized,
      submitted_at: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => '');
    throw new Error(`Lead automation failed: ${response.status} ${text.slice(0, 300)}`);
  }

  return { skipped: false };
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = leadFormSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Invalid lead data' },
        { status: 400 }
      );
    }

    const phoneNormalized = normalizeKzPhone(parsed.data.phone);
    if (!phoneNormalized) {
      return NextResponse.json(
        { success: false, message: 'Invalid lead data' },
        { status: 400 }
      );
    }

    // Send to Telegram
    await sendTelegramMessage(parsed.data, phoneNormalized);

    // Startup/MVP automation is best-effort: never break the public lead form
    // if WhatsApp automation is down, disconnected, or still in dry-run mode.
    notifyLeadAutomation(parsed.data, phoneNormalized).catch((error) => {
      console.error('Lead automation webhook failed:', error);
    });

    return NextResponse.json(
      { success: true, message: 'Lead received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing lead:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
