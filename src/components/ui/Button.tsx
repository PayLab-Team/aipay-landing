'use client';

import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link' | 'glow' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  pill?: boolean;
  withArrow?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading,
      disabled,
      children,
      pill = false,
      withArrow = false,
      onClick,
      type = 'button',
    },
    ref
  ) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-300',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      pill ? 'rounded-pill' : 'rounded-xl'
    );

    const variants = {
      primary: cn(
        'bg-primary-600 text-white',
        'hover:bg-primary-700 hover:shadow-elevation-3',
        'shadow-elevation-2'
      ),
      secondary: cn(
        'bg-white text-gray-900 border border-gray-200',
        'hover:bg-gray-50 hover:border-gray-300 hover:shadow-elevation-2',
        'shadow-elevation-1'
      ),
      ghost: 'hover:bg-gray-100 text-gray-700',
      link: 'text-primary-600 underline-offset-4 hover:underline',
      glow: cn(
        'relative bg-primary-600 text-white overflow-hidden',
        'hover:shadow-glow-primary',
        'shadow-elevation-2',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-400/0 before:via-primary-400/30 before:to-primary-400/0',
        'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700'
      ),
      outline: cn(
        'bg-transparent text-primary-600 border-2 border-primary-600',
        'hover:bg-primary-50 hover:shadow-elevation-2'
      ),
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm gap-2',
      md: 'h-11 px-6 text-base gap-2',
      lg: 'h-14 px-8 text-lg gap-3',
    };

    const content = (
      <>
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : null}
        {children}
        {withArrow && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </>
    );

    return (
      <motion.button
        className={cn(baseStyles, variants[variant], sizes[size], 'group', className)}
        ref={ref}
        disabled={isLoading || disabled}
        onClick={onClick}
        type={type}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
