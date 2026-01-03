import { z } from 'zod';

export const leadFormSchema = z.object({
  name: z.string().min(1, 'nameRequired'),
  phone: z
    .string()
    .min(1, 'phoneRequired')
    .regex(/^\+7[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, 'phoneInvalid'),
  businessName: z.string().optional(),
  businessType: z.string().min(1),
  hasKaspiPay: z.string().min(1),
  needsFiscal: z.string().min(1),
  integrationMethod: z.string().min(1),
  monthlyVolume: z.string().min(1),
  paymentModel: z.string().min(1),
  consent: z.boolean().refine((val) => val === true, 'consentRequired'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
