'use client';

import React, { useState, useEffect } from 'react';
import { ComponentInstance } from '@/lib/export';
import { 
  ComponentVariation, 
  generateAllVariations,
  PreferenceTracker 
} from '@/lib/variations';
import { componentRegistry } from '@/lib/tambo-config';
import ErrorBoundary from '@/components/ErrorBoundary';

interface VariationSelectorProps {
  component: ComponentInstance;
  onSelectVariation: (variation: ComponentVariation) => void;
  onClose: () => void;
}

export default function VariationSelector({
  component,
  onSelectVariation,
  onClose,
}: VariationSelectorProps) {
  const [variations, setVariations] = useState<ComponentVariation[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preferenceTracker] = useState(() => new PreferenceTracker());

  useEffect(() => {
    generateVariations();
    setSelectedIndex(0); // Reset selection when component changes
  }, [component]);

  const generateVariations = () => {
    setIsGenerating(true);
    
    console.log('Generating variations for component:', component);
    
    // Generate variations locally
    const newVariations = generateAllVariations(component, {
      colorCount: 3,
      layoutCount: 2,
      contentCount: 2,
    });
    
    console.log('Generated variations:', newVariations);
    console.log('Variation count:', newVariations.length);
    
    setVariations(newVariations);
    setSelectedIndex(0); // Reset to first variation
    setIsGenerating(false);
  };

  const handleSelectVariation = (variation: ComponentVariation, index: number) => {
    setSelectedIndex(index);
    
    // Track preference
    preferenceTracker.trackSelection(
      component.name,
      variation.variationType,
      variation.id
    );
    
    // Don't apply immediately, just select
    // onSelectVariation(variation);
  };

  const handleApplyVariation = () => {
    if (variations[selectedIndex]) {
      const variation = variations[selectedIndex];
      console.log('=== APPLYING VARIATION ===');
      console.log('Selected index:', selectedIndex);
      console.log('Variation ID:', variation.id);
      console.log('Variation type:', variation.variationType);
      console.log('Variation description:', variation.description);
      console.log('Variation props:', JSON.stringify(variation.props, null, 2));
      console.log('Component name:', variation.name);
      
      // Special logging for columns prop
      if (variation.props.columns !== undefined) {
        console.log('COLUMNS PROP:', variation.props.columns, 'type:', typeof variation.props.columns);
      }
      
      onSelectVariation(variation);
      onClose();
    }
  };

  const handleSurpriseMe = () => {
    const randomIndex = Math.floor(Math.random() * variations.length);
    setSelectedIndex(randomIndex);
  };

  const renderVariation = (variation: ComponentVariation) => {
    const ComponentClass = componentRegistry.find(c => c.name === variation.name)?.component;
    if (!ComponentClass) return null;

    return (
      <ErrorBoundary
        fallback={
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">Failed to render variation</p>
          </div>
        }
      >
        <ComponentClass {...variation.props} />
      </ErrorBoundary>
    );
  };

  const variationTypeColors = {
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    layout: 'bg-purple-100 text-purple-800 border-purple-300',
    content: 'bg-green-100 text-green-800 border-green-300',
    style: 'bg-orange-100 text-orange-800 border-orange-300',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Component Variations</h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose a variation or generate more options
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSurpriseMe}
              disabled={variations.length === 0}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Surprise Me
            </button>
            <button
              onClick={generateVariations}
              disabled={isGenerating}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Generate More
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {isGenerating ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-600">Generating variations...</p>
              </div>
            </div>
          ) : variations.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600">No variations available for this component</p>
              <button
                onClick={generateVariations}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Generate Variations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {variations.map((variation, index) => (
                <div
                  key={variation.id}
                  className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                    selectedIndex === index
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleSelectVariation(variation, index)}
                >
                  {/* Variation Header */}
                  <div className="p-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded border ${variationTypeColors[variation.variationType]}`}>
                        {variation.variationType}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {variation.description}
                      </span>
                    </div>
                    {selectedIndex === index && (
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>

                  {/* Variation Preview */}
                  <div className="bg-white overflow-hidden" style={{ maxHeight: '400px' }}>
                    <div className="transform scale-75 origin-top-left" style={{ width: '133.33%' }}>
                      {renderVariation(variation)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-600">
            {variations.length > 0 && (
              <span>
                {variations.length} variation{variations.length !== 1 ? 's' : ''} available
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleApplyVariation}
              disabled={variations.length === 0}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Use Selected Variation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
