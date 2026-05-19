import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema, type LeadFormData } from '@/schemas/leadForm';

async function sendTelegramMessage({ name, phone }: LeadFormData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials not configured!');
    return;
  }

  const submittedAt = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' });
  const message = `📱 New Lead!\n\nName: ${name}\nPhone: ${phone}\nTime: ${submittedAt}`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
    }),
  });
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

    // Send to Telegram
    await sendTelegramMessage(parsed.data);

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
