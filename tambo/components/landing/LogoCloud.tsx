import React from 'react';
import { LogoCloudProps } from '@/lib/schemas';

export default function LogoCloud({
  title = "Trusted by leading companies",
  logos = [],
  colorScheme = 'light',
}: LogoCloudProps) {
  const safeLogos = Array.isArray(logos) ? logos.filter(l => l && typeof l === 'object') : [];
  const displayLogos = safeLogos.length > 0 ? safeLogos : [
    { name: "Company 1", url: "" },
    { name: "Company 2", url: "" },
    { name: "Company 3", url: "" },
  ];

  const colorSchemes = {
    'light': {
      bg: 'bg-white',
      titleColor: 'text-gray-900',
      logoFilter: 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100',
    },
    'dark': {
      bg: 'bg-gray-900',
      titleColor: 'text-white',
      logoFilter: 'brightness-0 invert opacity-60 hover:opacity-100',
    },
    'gray': {
      bg: 'bg-gray-50',
      titleColor: 'text-gray-900',
      logoFilter: 'grayscale opacity-60 hover:grayscale-0 hover:opacity-100',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['light'];

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className="max-w-7xl mx-auto">
        {title && (
          <div className="text-center mb-12">
            <h3 className={`text-2xl font-semibold ${colors.titleColor}`}>
              {title}
            </h3>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {displayLogos.map((logo: any, index: number) => (
            <div 
              key={index}
              className="flex items-center justify-center p-4 transition-all duration-300"
            >
              {logo?.url ? (
                <img 
                  src={logo.url} 
                  alt={logo?.name || `Logo ${index + 1}`}
                  className={`h-12 w-auto object-contain ${colors.logoFilter} transition-all duration-300`}
                />
              ) : (
                <div className="h-12 w-32 bg-gray-200 rounded flex items-center justify-center text-gray-500 text-sm font-medium">
                  {logo?.name || `Logo ${index + 1}`}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
