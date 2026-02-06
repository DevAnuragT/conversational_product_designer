'use client';

import React, { useState } from 'react';
import { templates, Template, Industry } from '@/lib/templates';
import TemplateCard from './TemplateCard';

interface TemplateGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

const industries: { value: Industry | 'all'; label: string }[] = [
  { value: 'all', label: 'All Industries' },
  { value: 'saas', label: 'SaaS' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'finance', label: 'Finance' },
  { value: 'education', label: 'Education' },
];

export default function TemplateGallery({ isOpen, onClose, onSelectTemplate }: TemplateGalleryProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | 'all'>('all');
  
  if (!isOpen) return null;
  
  const filteredTemplates = selectedIndustry === 'all'
    ? templates
    : templates.filter(t => t.industry === selectedIndustry);
  
  const handleSelectTemplate = (template: Template) => {
    onSelectTemplate(template);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Choose a Template</h2>
              <p className="text-sm text-gray-400 mt-1">
                Start with a professionally designed template for your industry
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          {/* Industry Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {industries.map(industry => (
              <button
                key={industry.value}
                onClick={() => setSelectedIndustry(industry.value)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${selectedIndustry === industry.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
              >
                {industry.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Templates Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No templates found for this industry</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map(template => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  onSelect={() => handleSelectTemplate(template)}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-gray-700 bg-gray-750">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} available
            </span>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              Start from scratch instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
