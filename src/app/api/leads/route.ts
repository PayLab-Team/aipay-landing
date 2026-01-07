import { NextRequest, NextResponse } from 'next/server';

async function sendTelegramMessage(phone: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials not configured');
    return;
  }

  const message = `📱 New Lead!\n\nPhone: ${phone}\nTime: ${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })}`;

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
    const data = await request.json();

    // Send to Telegram
    await sendTelegramMessage(data.phone);

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
