'use client';

import { motion } from 'framer-motion';
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
      <div className="w-[500px] lg:w-[600px] bg-white rounded-2xl shadow-elevation-4 overflow-hidden border border-gray-100">
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
          <div className="ml-4 flex-1 h-6 bg-gray-100 rounded-md max-w-xs" />
        </div>

        {/* Dashboard content */}
        <div className="p-6 space-y-6">
          {/* Header with stats */}
          <div className="flex justify-between items-start">
            <div>
              <div className="h-4 w-32 bg-gray-100 rounded mb-2" />
              <div className="h-8 w-48 bg-gradient-to-r from-primary-100 to-primary-200 rounded-lg" />
            </div>
            <div className="flex gap-2">
              <div className="w-20 h-10 bg-primary-100 rounded-lg" />
              <div className="w-20 h-10 bg-gray-100 rounded-lg" />
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="h-3 w-16 bg-green-200 rounded mb-2" />
              <div className="h-6 w-24 bg-green-300 rounded" />
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="h-3 w-16 bg-blue-200 rounded mb-2" />
              <div className="h-6 w-24 bg-blue-300 rounded" />
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="h-3 w-16 bg-purple-200 rounded mb-2" />
              <div className="h-6 w-24 bg-purple-300 rounded" />
            </div>
          </div>

          {/* Chart placeholder */}
          <div className="h-32 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl flex items-end justify-around px-4 pb-4">
            <div className="w-8 bg-primary-200 rounded-t" style={{ height: '40%' }} />
            <div className="w-8 bg-primary-300 rounded-t" style={{ height: '60%' }} />
            <div className="w-8 bg-primary-400 rounded-t" style={{ height: '80%' }} />
            <div className="w-8 bg-primary-500 rounded-t" style={{ height: '65%' }} />
            <div className="w-8 bg-primary-400 rounded-t" style={{ height: '75%' }} />
            <div className="w-8 bg-primary-300 rounded-t" style={{ height: '55%' }} />
            <div className="w-8 bg-primary-200 rounded-t" style={{ height: '45%' }} />
          </div>

          {/* Table rows */}
          <div className="space-y-3">
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full" />
              <div className="flex-1">
                <div className="h-3 w-32 bg-gray-200 rounded mb-1" />
                <div className="h-2 w-24 bg-gray-100 rounded" />
              </div>
              <div className="h-4 w-16 bg-green-200 rounded-full" />
            </div>
            <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full" />
              <div className="flex-1">
                <div className="h-3 w-28 bg-gray-200 rounded mb-1" />
                <div className="h-2 w-20 bg-gray-100 rounded" />
              </div>
              <div className="h-4 w-16 bg-blue-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
