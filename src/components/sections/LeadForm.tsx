'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Phone } from 'lucide-react';
import { Container, Card, Button, Input } from '@/components/ui';
import { SectionHeading, ScrollReveal } from '@/components/shared';
import { leadFormSchema, type LeadFormData } from '@/schemas/leadForm';
import type { FieldErrors } from 'react-hook-form';

export function LeadForm() {
  const t = useTranslations('leadForm');
  const te = useTranslations('leadForm.errors');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const leadId = useMemo(() => {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }, []);
  const touchedRef = useRef(false);
  const submittedRef = useRef(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
  });

  const trackLeadEvent = (stage: 'form_started' | 'validation_failed' | 'submit_attempted' | 'submit_failed' | 'form_abandoned', extra: Record<string, string | undefined> = {}, keepAlive = false) => {
    const values = getValues();
    const payload = {
      leadId,
      stage,
      name: values.name,
      phone: values.phone,
      locale: window.location.pathname.split('/')[1] || 'ru',
      path: window.location.pathname,
      submittedAt: new Date().toISOString(),
      ...extra,
    };

    const body = JSON.stringify(payload);

    if (keepAlive && navigator.sendBeacon) {
      navigator.sendBeacon('/api/lead-events', new Blob([body], { type: 'application/json' }));
      return;
    }

    fetch('/api/lead-events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: keepAlive,
    }).catch(() => {
      // Tracking must never block the public form.
    });
  };

  const markStarted = () => {
    if (touchedRef.current) return;
    touchedRef.current = true;
    trackLeadEvent('form_started');
  };

  useEffect(() => {
    const handlePageHide = () => {
      if (touchedRef.current && !submittedRef.current) {
        trackLeadEvent('form_abandoned', { reason: 'User left the page before successful submit' }, true);
      }
    };

    window.addEventListener('pagehide', handlePageHide);
    return () => window.removeEventListener('pagehide', handlePageHide);
  }, [leadId]);

  const onSubmit = async (data: LeadFormData) => {
    submittedRef.current = false;
    trackLeadEvent('submit_attempted');
    setStatus('submitting');
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to submit');

      submittedRef.current = true;
      setStatus('success');
    } catch (error) {
      trackLeadEvent('submit_failed', { reason: error instanceof Error ? error.message : 'Failed to submit' });
      setStatus('error');
    }
  };

  const onInvalid = (formErrors: FieldErrors<LeadFormData>) => {
    const firstError = Object.entries(formErrors)[0];
    trackLeadEvent('validation_failed', {
      field: firstError?.[0],
      reason: firstError?.[1]?.message ? String(firstError[1].message) : 'Client-side validation failed',
    });
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

            <form onSubmit={handleSubmit(onSubmit, onInvalid)} onFocus={markStarted} className="space-y-6">
              <Input
                label={t('fields.name.label')}
                placeholder={t('fields.name.placeholder')}
                error={getError('name')}
                autoComplete="name"
                {...register('name')}
              />

              <Input
                label={t('fields.phone.label')}
                placeholder={t('fields.phone.placeholder')}
                hint={t('fields.phone.hint')}
                error={getError('phone')}
                type="tel"
                autoComplete="tel"
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
