import React from 'react';
import { NewsletterProps } from '@/lib/schemas';

export default function Newsletter({
  title = "Stay Updated",
  description = "Subscribe to our newsletter for the latest updates and exclusive offers.",
  buttonText = "Subscribe",
  placeholder = "Enter your email",
  colorScheme = 'blue-purple',
  layout = 'centered',
}: NewsletterProps) {
  const colorSchemes = {
    'blue-purple': {
      bg: 'bg-gradient-to-r from-blue-600 to-purple-600',
      inputBg: 'bg-white',
      buttonBg: 'bg-gray-900 hover:bg-black',
      text: 'text-white',
      subtext: 'text-blue-100',
    },
    'green-teal': {
      bg: 'bg-gradient-to-r from-green-600 to-teal-600',
      inputBg: 'bg-white',
      buttonBg: 'bg-gray-900 hover:bg-black',
      text: 'text-white',
      subtext: 'text-green-100',
    },
    'dark': {
      bg: 'bg-gray-900',
      inputBg: 'bg-gray-800',
      buttonBg: 'bg-white hover:bg-gray-100 text-gray-900',
      text: 'text-white',
      subtext: 'text-gray-300',
    },
    'light': {
      bg: 'bg-gray-50',
      inputBg: 'bg-white',
      buttonBg: 'bg-gray-900 hover:bg-black',
      text: 'text-gray-900',
      subtext: 'text-gray-600',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];

  const layoutClasses = {
    'centered': 'text-center max-w-2xl mx-auto',
    'split': 'md:flex md:items-center md:justify-between max-w-5xl mx-auto',
    'inline': 'flex flex-col sm:flex-row items-center justify-between max-w-4xl mx-auto gap-6',
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.centered}>
        <div className={layout === 'centered' ? 'mb-8' : layout === 'split' ? 'md:mr-8 mb-6 md:mb-0' : 'mb-6 sm:mb-0'}>
          <h2 className={`text-3xl sm:text-4xl font-bold ${colors.text} mb-3`}>
            {title}
          </h2>
          {description && (
            <p className={`text-lg ${colors.subtext}`}>
              {description}
            </p>
          )}
        </div>
        
        <form className={`flex gap-3 ${layout === 'centered' ? 'justify-center' : ''} ${layout === 'inline' ? 'flex-shrink-0' : 'w-full max-w-md'}`}>
          <input
            type="email"
            placeholder={placeholder}
            className={`flex-1 px-6 py-4 ${colors.inputBg} text-gray-900 rounded-xl focus:outline-none focus:ring-4 focus:ring-white/30 text-lg`}
          />
          <button
            type="submit"
            className={`px-8 py-4 ${colors.buttonBg} text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg whitespace-nowrap`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
