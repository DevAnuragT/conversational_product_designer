import React from 'react';
import { CallToActionProps } from '@/lib/schemas';

const ButtonComponent = ({ button, isPrimary = false }: { 
  button: { text: string; link?: string }, 
  isPrimary?: boolean 
}) => {
  const baseClasses = `inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg transition-colors duration-200 ${
    isPrimary 
      ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg hover:shadow-xl' 
      : 'border-2 border-white text-white hover:bg-white hover:text-gray-900'
  }`;

  if (button.link) {
    return (
      <a href={button.link} className={baseClasses}>
        {button.text}
      </a>
    );
  }

  return (
    <button className={baseClasses}>
      {button.text}
    </button>
  );
};

export default function CallToAction({
  headline,
  description,
  primaryButton,
  secondaryButton,
  backgroundColor = "primary"
}: CallToActionProps) {
  const getBackgroundClasses = () => {
    switch (backgroundColor) {
      case "primary":
        return "bg-blue-600";
      case "secondary":
        return "bg-gray-800";
      case "accent":
        return "bg-indigo-600";
      default:
        return "bg-blue-600";
    }
  };

  return (
    <section className={`py-16 px-4 sm:px-6 lg:px-8 ${getBackgroundClasses()}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          {headline}
        </h2>
        
        {description && (
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <ButtonComponent button={primaryButton} isPrimary={true} />
          
          {secondaryButton && (
            <ButtonComponent button={secondaryButton} isPrimary={false} />
          )}
        </div>
      </div>
    </section>
  );
}