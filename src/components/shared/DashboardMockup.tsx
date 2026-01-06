'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { float } from '@/lib/animations';

interface DashboardMockupProps {
  variant?: 'dashboard' | 'mobile' | 'code';
  className?: string;
  animate?: boolean;
}

export function DashboardMockup({
  variant = 'dashboard',
  className,
  animate = true,
}: DashboardMockupProps) {
  const Wrapper = animate ? motion.div : 'div';
  const wrapperProps = animate
    ? { variants: float, initial: 'initial', animate: 'animate' }
    : {};

  if (variant === 'mobile') {
    return (
      <Wrapper
        className={cn('relative', className)}
        {...wrapperProps}
      >
        {/* Phone frame */}
        <div className="relative w-[280px] h-[560px] bg-gray-900 rounded-[3rem] p-3 shadow-elevation-4">
          {/* Screen */}
          <div className="w-full h-full bg-gradient-to-b from-primary-50 to-white rounded-[2.5rem] overflow-hidden">
            {/* Status bar */}
            <div className="flex justify-between items-center px-6 py-3">
              <div className="w-12 h-3 bg-gray-200 rounded-full" />
              <div className="w-16 h-3 bg-gray-200 rounded-full" />
            </div>
            {/* Content */}
            <div className="px-4 space-y-4">
              <div className="h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                <div className="h-4 bg-gray-100 rounded-full w-1/2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-20 bg-gray-100 rounded-xl" />
                <div className="h-20 bg-gray-100 rounded-xl" />
              </div>
            </div>
          </div>
          {/* Notch */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-full" />
        </div>
      </Wrapper>
    );
  }

  if (variant === 'code') {
    return (
      <Wrapper
        className={cn('relative', className)}
        {...wrapperProps}
      >
        <div className="w-[400px] bg-gray-900 rounded-xl shadow-elevation-4 overflow-hidden">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-400">api.ts</span>
          </div>
          {/* Code content */}
          <div className="p-4 font-mono text-sm space-y-2">
            <div className="flex gap-2">
              <span className="text-purple-400">const</span>
              <span className="text-blue-300">payment</span>
              <span className="text-white">=</span>
              <span className="text-yellow-300">await</span>
            </div>
            <div className="pl-4 flex gap-2">
              <span className="text-green-400">aipay</span>
              <span className="text-white">.</span>
              <span className="text-blue-300">verify</span>
              <span className="text-gray-400">(orderId)</span>
            </div>
            <div className="h-3" />
            <div className="flex gap-2">
              <span className="text-purple-400">if</span>
              <span className="text-gray-400">(</span>
              <span className="text-blue-300">payment</span>
              <span className="text-white">.</span>
              <span className="text-green-400">success</span>
              <span className="text-gray-400">)</span>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // Default: dashboard
  return (
    <Wrapper
      className={cn('relative', className)}
      {...wrapperProps}
    >
      <div className="w-[500px] lg:w-[600px] rounded-2xl shadow-elevation-4 overflow-hidden border border-gray-200">
        <Image
          src="/images/dashboard.png"
          alt="AI PAY Dashboard"
          width={2424}
          height={1740}
          className="w-full h-auto"
          priority
        />
      </div>
    </Wrapper>
  );
}
