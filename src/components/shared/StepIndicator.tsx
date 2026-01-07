'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

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
    <div ref={ref} className={cn('relative', className)}>
      {isHorizontal ? (
        /* Horizontal layout for desktop */
        <div className="hidden lg:block">
          {/* Circles row with connecting line */}
          <div className="relative flex items-center justify-between mb-6">
            {/* Connecting line behind circles */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gray-200 -translate-y-1/2">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Circles */}
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-elevation-3"
                initial={{ scale: 0.8, boxShadow: '0 0 0 rgba(99, 102, 241, 0)' }}
                animate={isInView ? {
                  scale: 1,
                  boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)'
                } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(99, 102, 241, 0.5)'
                }}
              >
                {step.number}
              </motion.div>
            ))}
          </div>

          {/* Text row aligned with circles */}
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="flex-1 text-center px-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.15 }}
              >
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Vertical layout for mobile (always shown on mobile, hidden on desktop when horizontal) */}
      <div className={cn(isHorizontal ? 'lg:hidden' : '')}>
        <div className="relative flex flex-col gap-6">
          {/* Vertical connecting line */}
          <div className="absolute left-7 top-7 bottom-7 w-0.5 bg-gray-200">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative z-10 flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {/* Circle */}
              <motion.div
                className="w-14 h-14 shrink-0 rounded-full flex items-center justify-center text-xl font-bold bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-elevation-3"
                initial={{ scale: 0.8 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {step.number}
              </motion.div>

              {/* Content */}
              <div className="pt-2">
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
