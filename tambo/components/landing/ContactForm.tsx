import React from 'react';
import { ContactFormProps } from '@/lib/schemas';

export default function ContactForm({
  title = "Get In Touch",
  description = "Have a question? We'd love to hear from you.",
  fields = [],
  buttonText = "Send Message",
  colorScheme = 'blue-purple',
  layout = 'centered',
}: ContactFormProps) {
  const safeFields = Array.isArray(fields) ? fields : [];
  const displayFields = safeFields.length > 0 ? safeFields : [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'message', label: 'Message', type: 'textarea', required: true },
  ];

  const colorSchemes = {
    'blue-purple': {
      bg: 'bg-gradient-to-br from-blue-50 to-purple-50',
      formBg: 'bg-white',
      titleColor: 'text-gray-900',
      buttonBg: 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700',
    },
    'green': {
      bg: 'bg-green-50',
      formBg: 'bg-white',
      titleColor: 'text-gray-900',
      buttonBg: 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700',
    },
    'dark': {
      bg: 'bg-gray-900',
      formBg: 'bg-gray-800',
      titleColor: 'text-white',
      buttonBg: 'bg-white hover:bg-gray-100 text-gray-900',
    },
  };

  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes['blue-purple'];

  const layoutClasses = {
    'centered': 'max-w-2xl mx-auto',
    'split': 'max-w-6xl mx-auto grid md:grid-cols-2 gap-12',
    'wide': 'max-w-4xl mx-auto',
  };

  return (
    <section className={`py-20 px-4 sm:px-6 lg:px-8 ${colors.bg}`}>
      <div className={layoutClasses[layout as keyof typeof layoutClasses] || layoutClasses.centered}>
        <div className={layout === 'split' ? 'flex flex-col justify-center' : 'text-center mb-12'}>
          <h2 className={`text-4xl sm:text-5xl font-bold ${colors.titleColor} mb-6`}>
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600">
              {description}
            </p>
          )}
        </div>
        
        <form className={`${colors.formBg} rounded-2xl shadow-xl p-8`}>
          <div className="space-y-6">
            {displayFields.map((field: any, index: number) => (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field?.label || 'Field'} {field?.required && <span className="text-red-500">*</span>}
                </label>
                {field?.type === 'textarea' ? (
                  <textarea
                    name={field?.name || `field-${index}`}
                    required={field?.required}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field?.placeholder || ''}
                  />
                ) : (
                  <input
                    type={field?.type || 'text'}
                    name={field?.name || `field-${index}`}
                    required={field?.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={field?.placeholder || ''}
                  />
                )}
              </div>
            ))}
          </div>
          
          <button
            type="submit"
            className={`w-full mt-8 px-8 py-4 ${colors.buttonBg} text-white font-bold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
