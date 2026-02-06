import React from 'react';
import { StatsProps } from '@/lib/schemas';

export default function Stats({
  title,
  stats = [],
  colorScheme = 'blue-purple',
  layout = 'grid',
}: StatsProps) {
  const safeStats = Array.isArray(stats) ? stats.filter(s => s && typeof s === 'object') : [];
  const displayStats = safeStats.length > 0 ? safeStats : [
    { value: "10K+", label: "Happy Customers" },
    { value: "99%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  const colorSchemes = {
    'blue-purple': {
      bg: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
      valueColor: 'text-white',
      labelColor: 'text-blue-100',
    },
    'green-teal': {
      bg: 'bg-gradient-to-br from-green-600 via-teal-600 to-cyan-700',
      valueColor: 'text-white',
      labelColor: 'text-green-100',
    },
    'dark': {
      bg: 'bg-gradient-to-br from-gray-900 to-black',
      valueColor: 'text-white',
      labelColor: 'text-gray-300',
    },
    'light': {
      bg: 'bg-gray-50',
      valueColor: 'text-gray-900',
      labelColor: 'text-gray-600',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];

  const layoutClasses = {
    'grid': 'grid grid-cols-2 md:grid-cols-4 gap-8',
    'row': 'flex flex-wrap justify-center gap-12',
    'compact': 'flex flex-wrap justify-around gap-8',
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-16">
            <h2 className={`text-4xl sm:text-5xl font-bold ${colors.valueColor} mb-6`}>
              {title}
            </h2>
          </div>
        )}
        
        <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.grid}>
          {displayStats.map((stat: any, index: number) => (
            <div key={index} className="text-center">
              <div className={`text-5xl sm:text-6xl font-extrabold ${colors.valueColor} mb-2`}>
                {stat?.value || '0'}
              </div>
              <div className={`text-xl ${colors.labelColor} font-medium`}>
                {stat?.label || 'Metric'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
