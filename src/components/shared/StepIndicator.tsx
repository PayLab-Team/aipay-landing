'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function StepIndicator({
  steps,
  orientation = 'horizontal',
  className,
}: StepIndicatorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={ref}
      className={cn(
        'relative',
        isHorizontal ? 'flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-4' : 'flex flex-col gap-8',
        className
      )}
    >
      {/* Connecting line */}
      {isHorizontal ? (
        <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-0.5 bg-gray-200">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'left' }}
          />
        </div>
      ) : (
        <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gray-200">
          <motion.div
            className="w-full bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            style={{ transformOrigin: 'top' }}
          />
        </div>
      )}

      {steps.map((step, index) => (
        <motion.div
          key={step.number}
          className={cn(
            'relative z-10',
            isHorizontal ? 'flex-1 text-center' : 'flex items-start gap-6'
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
        >
          {/* Step circle */}
          <motion.div
            className={cn(
              'w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300',
              'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-elevation-3',
              isHorizontal ? 'mx-auto mb-4' : ''
            )}
            initial={{ scale: 0.8, boxShadow: '0 0 0 rgba(99, 102, 241, 0)' }}
            animate={isInView ? {
              scale: 1,
              boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
            } : {}}
            transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
            whileHover={{
              scale: 1.1,
              boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)'
            }}
          >
            {step.number}
          </motion.div>

          {/* Step content */}
          <div className={cn(isHorizontal ? '' : 'flex-1 pt-2')}>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
