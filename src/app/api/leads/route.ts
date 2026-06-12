import { NextRequest, NextResponse } from 'next/server';
import { leadFormSchema, type LeadFormData } from '@/schemas/leadForm';
import { normalizeKzPhone, sendLeadSuccessMessage, sendLeadEventMessage } from '@/lib/server/lead-notifications';

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

    // Send success notification to Telegram.
    await sendLeadSuccessMessage(parsed.data, phoneNormalized);

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
    try {
      await sendLeadEventMessage({
        leadId: `server-error-${Date.now()}`,
        stage: 'submit_failed',
        reason: error instanceof Error ? error.message : 'Unknown server error',
      });
    } catch (notifyError) {
      console.error('Failed to notify lead submit failure:', notifyError);
    }
    return NextResponse.json(
      { success: false, message: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
