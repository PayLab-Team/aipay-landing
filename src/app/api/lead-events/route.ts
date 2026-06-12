import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { sendLeadEventMessage, type LeadStage } from '@/lib/server/lead-notifications';

const leadStageSchema = z.enum([
  'form_viewed',
  'form_started',
  'validation_failed',
  'submit_attempted',
  'submit_success',
  'submit_failed',
  'form_abandoned',
]);

const leadEventSchema = z.object({
  leadId: z.string().min(8).max(120),
  stage: leadStageSchema,
  name: z.string().max(120).optional(),
  phone: z.string().max(40).optional(),
  locale: z.string().max(12).optional(),
  path: z.string().max(300).optional(),
  reason: z.string().max(500).optional(),
  field: z.string().max(80).optional(),
  submittedAt: z.string().max(80).optional(),
});

const NOTIFY_STAGES: LeadStage[] = [
  'validation_failed',
  'submit_failed',
  'form_abandoned',
];

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const parsed = leadEventSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: 'Invalid lead event' }, { status: 400 });
    }

    if (NOTIFY_STAGES.includes(parsed.data.stage)) {
      await sendLeadEventMessage({
        ...parsed.data,
        stage: parsed.data.stage,
        userAgent: request.headers.get('user-agent') ?? undefined,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing lead event:', error);
    return NextResponse.json({ success: false, message: 'Failed to process lead event' }, { status: 500 });
  }
}
