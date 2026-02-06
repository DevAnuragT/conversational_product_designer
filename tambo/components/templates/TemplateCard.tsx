'use client';

import React from 'react';
import { Template } from '@/lib/templates';

interface TemplateCardProps {
  template: Template;
  onSelect: () => void;
}

const industryColors: Record<string, string> = {
  saas: 'bg-blue-500',
  ecommerce: 'bg-purple-500',
  healthcare: 'bg-green-500',
  finance: 'bg-indigo-500',
  education: 'bg-orange-500',
};

const industryIcons: Record<string, string> = {
  saas: '💼',
  ecommerce: '🛍️',
  healthcare: '🏥',
  finance: '💳',
  education: '📚',
};

export default function TemplateCard({ template, onSelect }: TemplateCardProps) {
  return (
    <div
      onClick={onSelect}
      className="bg-gray-700 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all group"
    >
      {/* Preview */}
      <div className={`h-32 ${industryColors[template.industry]} flex items-center justify-center text-6xl`}>
        {industryIcons[template.industry]}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
            {template.name}
          </h3>
          <span className="text-xs px-2 py-1 bg-gray-600 text-gray-300 rounded capitalize">
            {template.industry}
          </span>
        </div>
        
        <p className="text-sm text-gray-400 mb-3">
          {template.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{template.components.length} components</span>
          <span className="text-blue-400 group-hover:text-blue-300">
            Use template →
          </span>
        </div>
      </div>
    </div>
  );
}
