'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, AlertCircle } from 'lucide-react';
import { Container, Card, Button, Input, Select } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';
import { leadFormSchema, type LeadFormData } from '@/schemas/leadForm';
import { cn } from '@/lib/utils';

export function LeadForm() {
  const t = useTranslations('leadForm');
  const te = useTranslations('leadForm.errors');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      consent: false,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setStatus('submitting');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const getError = (field: keyof LeadFormData) => {
    const error = errors[field];
    if (!error?.message) return undefined;
    return te(error.message as keyof typeof te);
  };

  if (status === 'success') {
    return (
      <section id="contact" className="py-16 lg:py-24 bg-primary-50">
        <Container>
          <Card className="max-w-2xl mx-auto p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-8 h-8 text-green-600" />
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {t('success')}
            </h3>
          </Card>
        </Container>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 lg:py-24 bg-primary-50">
      <Container>
        <ScrollReveal>
          <Card className="max-w-2xl mx-auto p-8">
            <SectionHeading
              title={t('title')}
              subtitle={t('description')}
              className="mb-8"
            />

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{t('error')}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Row 1: Name & Phone */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('fields.name.label')}
                  placeholder={t('fields.name.placeholder')}
                  error={getError('name')}
                  {...register('name')}
                />
                <Input
                  label={t('fields.phone.label')}
                  placeholder={t('fields.phone.placeholder')}
                  hint={t('fields.phone.hint')}
                  error={getError('phone')}
                  {...register('phone')}
                />
              </div>

              {/* Row 2: Business Name & Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label={t('fields.businessName.label')}
                  placeholder={t('fields.businessName.placeholder')}
                  {...register('businessName')}
                />
                <Select
                  label={t('fields.businessType.label')}
                  options={t.raw('fields.businessType.options') as string[]}
                  placeholder="Выберите..."
                  {...register('businessType')}
                />
              </div>

              {/* Row 3: Kaspi Pay & Fiscal */}
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label={t('fields.hasKaspiPay.label')}
                  options={t.raw('fields.hasKaspiPay.options') as string[]}
                  hint={t('fields.hasKaspiPay.hint')}
                  placeholder="Выберите..."
                  {...register('hasKaspiPay')}
                />
                <Select
                  label={t('fields.needsFiscal.label')}
                  options={t.raw('fields.needsFiscal.options') as string[]}
                  hint={t('fields.needsFiscal.hint')}
                  placeholder="Выберите..."
                  {...register('needsFiscal')}
                />
              </div>

              {/* Row 4: Integration & Volume */}
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label={t('fields.integrationMethod.label')}
                  options={t.raw('fields.integrationMethod.options') as string[]}
                  placeholder="Выберите..."
                  {...register('integrationMethod')}
                />
                <Select
                  label={t('fields.monthlyVolume.label')}
                  options={t.raw('fields.monthlyVolume.options') as string[]}
                  placeholder="Выберите..."
                  {...register('monthlyVolume')}
                />
              </div>

              {/* Payment Model */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {t('fields.paymentModel.label')}
                </label>
                <div className="flex flex-wrap gap-4">
                  {(t.raw('fields.paymentModel.options') as string[]).map(
                    (option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          value={option}
                          {...register('paymentModel')}
                          className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{option}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              {/* Consent */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('consent')}
                    className={cn(
                      'mt-1 w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500',
                      errors.consent && 'border-red-500'
                    )}
                  />
                  <span className="text-sm text-gray-600">
                    {t('fields.consent.label')}
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-xs text-red-600 mt-1">
                    {getError('consent')}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={status === 'submitting'}
              >
                {status === 'submitting' ? t('submitting') : t('submit')}
              </Button>
            </form>
          </Card>
        </ScrollReveal>
      </Container>
    </section>
  );
}
