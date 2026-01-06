'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Phone } from 'lucide-react';
import { Container, Card, Button, Input } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';
import { leadFormSchema, type LeadFormData } from '@/schemas/leadForm';

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
          <Card className="max-w-md mx-auto p-8 text-center">
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
          <Card className="max-w-md mx-auto p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-primary-600" />
              </div>
            </div>

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
              <Input
                label={t('fields.phone.label')}
                placeholder={t('fields.phone.placeholder')}
                hint={t('fields.phone.hint')}
                error={getError('phone')}
                {...register('phone')}
              />

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
