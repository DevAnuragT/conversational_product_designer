import React from 'react';
import { FeatureGridProps } from '@/lib/schemas';

export default function FeatureGrid({ title, features, columns = "3" }: FeatureGridProps) {
  const getGridCols = () => {
    switch (columns) {
      case "2": return "grid-cols-1 md:grid-cols-2";
      case "3": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4": return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          </div>
        )}
        
        <div className={`grid ${getGridCols()} gap-8`}>
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              {feature.icon && (
                <div className="mb-4 flex justify-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                </div>
              )}
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}