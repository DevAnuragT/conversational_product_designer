import React from 'react';
import { CallToActionProps } from '@/lib/schemas';

// Color scheme configurations
const colorSchemes = {
  'blue-purple': {
    bg: 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700',
    text: 'text-white',
    subtext: 'text-blue-100',
    primaryButton: 'bg-white text-blue-600 hover:bg-gray-50',
    secondaryButton: 'border-3 border-white text-white hover:bg-white hover:text-blue-600',
  },
  'green-teal': {
    bg: 'bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600',
    text: 'text-white',
    subtext: 'text-green-100',
    primaryButton: 'bg-white text-green-600 hover:bg-gray-50',
    secondaryButton: 'border-3 border-white text-white hover:bg-white hover:text-green-600',
  },
  'orange-red': {
    bg: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-600',
    text: 'text-white',
    subtext: 'text-orange-100',
    primaryButton: 'bg-white text-orange-600 hover:bg-gray-50',
    secondaryButton: 'border-3 border-white text-white hover:bg-white hover:text-orange-600',
  },
  'dark': {
    bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    text: 'text-white',
    subtext: 'text-gray-300',
    primaryButton: 'bg-white text-gray-900 hover:bg-gray-100',
    secondaryButton: 'border-3 border-white text-white hover:bg-white hover:text-gray-900',
  },
  'light': {
    bg: 'bg-gradient-to-br from-gray-50 via-white to-gray-100',
    text: 'text-gray-900',
    subtext: 'text-gray-600',
    primaryButton: 'bg-gray-900 text-white hover:bg-gray-800',
    secondaryButton: 'border-3 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white',
  },
  'gradient': {
    bg: 'bg-gradient-to-br from-purple-600 via-pink-600 to-red-600',
    text: 'text-white',
    subtext: 'text-purple-100',
    primaryButton: 'bg-white text-purple-600 hover:bg-gray-50',
    secondaryButton: 'border-3 border-white text-white hover:bg-white hover:text-purple-600',
  },
};

const ButtonComponent = ({ 
  button, 
  isPrimary = false,
  buttonClasses,
}: { 
  button: { text: string; link?: string }, 
  isPrimary?: boolean,
  buttonClasses: string,
}) => {
  const baseClasses = `group inline-flex items-center justify-center px-10 py-5 text-xl font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 ${buttonClasses} ${
    isPrimary 
      ? 'shadow-2xl hover:shadow-3xl' 
      : 'shadow-lg hover:shadow-2xl'
  }`;

  const content = (
    <>
      {button.text}
      <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </>
  );

  if (button.link) {
    return (
      <a href={button.link} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button className={baseClasses}>
      {content}
    </button>
  );
};

export default function CallToAction({
  headline = "Ready to Get Started?",
  description,
  primaryButton = { text: "Get Started" },
  secondaryButton,
  colorScheme = 'blue-purple',
  layout = 'centered',
}: CallToActionProps) {
  const colors = colorSchemes[colorScheme] || colorSchemes['blue-purple'];
  
  const layoutClasses = {
    'centered': 'text-center mx-auto',
    'split': 'text-left lg:text-center lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center',
    'banner': 'text-center mx-auto py-16',
  };
  
  const containerClasses = {
    'centered': 'max-w-5xl',
    'split': 'max-w-7xl',
    'banner': 'max-w-6xl',
  };

  return (
    <section className={`relative py-24 px-4 sm:px-6 lg:px-8 ${colors.bg} overflow-hidden`}>
      {/* Background decorative elements */}
      {colorScheme !== 'light' && (
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      )}
      
      <div className={`relative ${containerClasses[layout]} ${layoutClasses[layout]}`}>
        <div className={layout === 'split' ? 'lg:col-span-1' : ''}>
          <h2 className={`text-5xl sm:text-6xl lg:text-7xl font-extrabold ${colors.text} mb-8 leading-tight`}>
            {colorScheme !== 'light' ? (
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                {headline}
              </span>
            ) : (
              headline
            )}
          </h2>
          
          {description && (
            <p className={`text-2xl ${colors.subtext} mb-12 max-w-3xl ${layout === 'centered' ? 'mx-auto' : ''} leading-relaxed`}>
              {description}
            </p>
          )}
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-6 ${
          layout === 'centered' ? 'justify-center' : 
          layout === 'split' ? 'lg:col-span-1 lg:justify-start' : 
          'justify-center'
        } items-center`}>
          <ButtonComponent 
            button={{ 
              text: (primaryButton && typeof primaryButton === 'object' && primaryButton.text) ? String(primaryButton.text) : "Get Started", 
              link: (primaryButton && typeof primaryButton === 'object' && primaryButton.link) ? String(primaryButton.link) : undefined 
            }} 
            isPrimary={true}
            buttonClasses={colors.primaryButton}
          />
          
          {secondaryButton && typeof secondaryButton === 'object' && secondaryButton.text && (
            <ButtonComponent 
              button={{ 
                text: String(secondaryButton.text) || "Learn More", 
                link: secondaryButton.link ? String(secondaryButton.link) : undefined 
              }} 
              isPrimary={false}
              buttonClasses={colors.secondaryButton}
            />
          )}
        </div>
      </div>
    </section>
  );
}
