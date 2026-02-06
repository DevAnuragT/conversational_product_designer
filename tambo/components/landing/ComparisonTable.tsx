import React from 'react';
import { ComparisonTableProps } from '@/lib/schemas';

export default function ComparisonTable({
  title = "Compare Plans",
  description,
  features = [],
  plans = [],
  colorScheme = 'blue',
}: ComparisonTableProps) {
  const safeFeatures = Array.isArray(features) ? features : [];
  const safePlans = Array.isArray(plans) ? plans : [];
  
  const displayFeatures = safeFeatures.length > 0 ? safeFeatures : ['Feature 1', 'Feature 2', 'Feature 3'];
  const displayPlans = safePlans.length > 0 ? safePlans : [
    { name: 'Basic', values: [true, false, false] },
    { name: 'Pro', values: [true, true, false] },
    { name: 'Enterprise', values: [true, true, true] },
  ];

  const colorSchemes = {
    'blue': 'bg-blue-600',
    'green': 'bg-green-600',
    'purple': 'bg-purple-600',
  };

  const headerColor = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue'];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={headerColor}>
                  <th className="px-6 py-4 text-left text-white font-bold">Features</th>
                  {displayPlans.map((plan: any, index: number) => (
                    <th key={index} className="px-6 py-4 text-center text-white font-bold">
                      {plan?.name || `Plan ${index + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayFeatures.map((feature: any, featureIndex: number) => (
                  <tr key={featureIndex} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {typeof feature === 'string' ? feature : feature?.name || 'Feature'}
                    </td>
                    {displayPlans.map((plan: any, planIndex: number) => (
                      <td key={planIndex} className="px-6 py-4 text-center">
                        {plan?.values?.[featureIndex] ? (
                          <svg className="w-6 h-6 text-green-500 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-gray-300 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
