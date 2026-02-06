'use client';

import React, { useState, useEffect } from 'react';
import { ComponentInstance } from '@/lib/export';
import PropsEditor from './PropsEditor';
import { componentRegistry } from '@/lib/tambo-config';

interface EditModalProps {
  component: ComponentInstance;
  onSave: (updatedProps: any) => void;
  onCancel: () => void;
}

export default function EditModal({ component, onSave, onCancel }: EditModalProps) {
  const [props, setProps] = useState(component.props);
  const [hasChanges, setHasChanges] = useState(false);
  
  useEffect(() => {
    setProps(component.props);
    setHasChanges(false);
  }, [component]);
  
  const handleFieldChange = (field: string, value: any) => {
    setProps((prev: any) => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };
  
  const handleSave = () => {
    onSave(props);
  };
  
  const handleCancel = () => {
    if (hasChanges) {
      if (confirm('Discard changes?')) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };
  
  // Get the actual component for preview
  const ComponentPreview = componentRegistry.find(c => c.name === component.name)?.component;
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleCancel}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="bg-gray-800 rounded-xl max-w-7xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Editor */}
        <div className="w-full md:w-1/2 p-6 overflow-y-auto border-r border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Edit {component.name}
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Make changes and see live preview
              </p>
            </div>
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
          
          <div className="mb-6">
            <PropsEditor 
              props={props}
              onChange={handleFieldChange}
            />
          </div>
          
          <div className="flex gap-4 sticky bottom-0 bg-gray-800 pt-4 border-t border-gray-700">
            <button
              onClick={handleSave}
              disabled={!hasChanges}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        
        {/* Right: Preview */}
        <div className="w-full md:w-1/2 bg-white overflow-y-auto">
          <div className="sticky top-0 bg-gray-100 border-b border-gray-200 px-4 py-3 z-10">
            <h3 className="text-sm font-semibold text-gray-700 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Preview
            </h3>
          </div>
          <div className="p-0">
            {ComponentPreview ? (
              <ComponentPreview {...props} />
            ) : (
              <div className="p-8 text-center text-gray-500">
                Preview not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
