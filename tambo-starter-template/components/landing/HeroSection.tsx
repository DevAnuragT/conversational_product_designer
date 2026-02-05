import React from 'react';
import { HeroSectionProps } from '@/lib/schemas';

export default function HeroSection({
  headline,
  subheadline,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section 
      className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4 sm:px-6 lg:px-8"
      style={backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {backgroundImage && (
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      )}
      
      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 ${
          backgroundImage ? 'text-white' : 'text-gray-900'
        }`}>
          {headline}
        </h1>
        
        <p className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${
          backgroundImage ? 'text-gray-100' : 'text-gray-600'
        }`}>
          {subheadline}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {ctaLink ? (
            <a
              href={ctaLink}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              {ctaText}
            </a>
          ) : (
            <button className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              {ctaText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}