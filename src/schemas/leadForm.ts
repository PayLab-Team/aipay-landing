import { z } from 'zod';

export const leadFormSchema = z.object({
  phone: z
    .string()
    .min(1, 'phoneRequired')
    .regex(/^\+7[\s-]?\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, 'phoneInvalid'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
