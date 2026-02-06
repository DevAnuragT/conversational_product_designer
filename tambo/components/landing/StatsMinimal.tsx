import React from 'react';
import { StatsMinimalProps } from '@/lib/schemas';

// Alternative stats - minimal inline style
export default function StatsMinimal({
  stats = [],
  colorScheme = 'light',
}: StatsMinimalProps) {
  const safeStats = Array.isArray(stats) ? stats.filter(s => s && typeof s === 'object') : [];
  const displayStats = safeStats.length > 0 ? safeStats : [
    { value: "10K+", label: "Users" },
    { value: "99%", label: "Satisfaction" },
    { value: "24/7", label: "Support" },
  ];

  const colorSchemes = {
    'light': {
      bg: 'bg-white',
      valueColor: 'text-gray-900',
      labelColor: 'text-gray-600',
      divider: 'border-gray-200',
    },
    'dark': {
      bg: 'bg-gray-900',
      valueColor: 'text-white',
      labelColor: 'text-gray-400',
      divider: 'border-gray-700',
    },
    'accent': {
      bg: 'bg-blue-600',
      valueColor: 'text-white',
      labelColor: 'text-blue-100',
      divider: 'border-blue-400',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['light'];

  return (
    <section className={`py-12 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-around items-center gap-8">
          {displayStats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className={`text-4xl sm:text-5xl font-bold ${colors.valueColor} mb-1`}>
                {stat?.value || '0'}
              </div>
              <div className={`text-sm sm:text-base ${colors.labelColor} font-medium uppercase tracking-wide`}>
                {stat?.label || 'Metric'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
