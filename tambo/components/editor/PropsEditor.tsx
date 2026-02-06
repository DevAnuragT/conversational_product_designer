'use client';

import React from 'react';

interface PropsEditorProps {
  props: any;
  onChange: (field: string, value: any) => void;
}

export default function PropsEditor({ props, onChange }: PropsEditorProps) {
  const renderField = (key: string, value: any, path: string = key) => {
    // Handle arrays
    if (Array.isArray(value)) {
      return (
        <div key={path} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {formatFieldName(key)}
          </label>
          <div className="space-y-3 pl-4 border-l-2 border-gray-600">
            {value.map((item, index) => (
              <div key={`${path}.${index}`} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Item {index + 1}</span>
                  <button
                    onClick={() => {
                      const newArray = [...value];
                      newArray.splice(index, 1);
                      onChange(key, newArray);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
                {typeof item === 'object' && item !== null ? (
                  Object.entries(item).map(([subKey, subValue]) => (
                    <div key={`${path}.${index}.${subKey}`}>
                      <label className="block text-xs font-medium text-gray-400 mb-1">
                        {formatFieldName(subKey)}
                      </label>
                      {renderInput(`${path}.${index}.${subKey}`, subValue, (newValue) => {
                        const newArray = [...value];
                        newArray[index] = { ...newArray[index], [subKey]: newValue };
                        onChange(key, newArray);
                      })}
                    </div>
                  ))
                ) : (
                  renderInput(`${path}.${index}`, item, (newValue) => {
                    const newArray = [...value];
                    newArray[index] = newValue;
                    onChange(key, newArray);
                  })
                )}
              </div>
            ))}
            <button
              onClick={() => {
                const newItem = value.length > 0 && typeof value[0] === 'object'
                  ? { ...value[0] }
                  : '';
                onChange(key, [...value, newItem]);
              }}
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              + Add Item
            </button>
          </div>
        </div>
      );
    }
    
    // Handle nested objects
    if (typeof value === 'object' && value !== null) {
      return (
        <div key={path} className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">
            {formatFieldName(key)}
          </label>
          <div className="space-y-3 pl-4 border-l-2 border-gray-600">
            {Object.entries(value).map(([subKey, subValue]) => (
              <div key={`${path}.${subKey}`}>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  {formatFieldName(subKey)}
                </label>
                {renderInput(`${path}.${subKey}`, subValue, (newValue) => {
                  onChange(key, { ...value, [subKey]: newValue });
                })}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Handle primitive values
    return (
      <div key={path}>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          {formatFieldName(key)}
        </label>
        {renderInput(path, value, (newValue) => onChange(key, newValue))}
      </div>
    );
  };
  
  const renderInput = (path: string, value: any, onChange: (value: any) => void) => {
    // Boolean
    if (typeof value === 'boolean') {
      return (
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className="mr-2 w-4 h-4 rounded"
          />
          <span className="text-sm text-gray-400">Enabled</span>
        </label>
      );
    }
    
    // Number
    if (typeof value === 'number') {
      return (
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
        />
      );
    }
    
    // String - use textarea for longer text
    const isLongText = typeof value === 'string' && value.length > 50;
    
    if (isLongText) {
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
          rows={3}
        />
      );
    }
    
    return (
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
      />
    );
  };
  
  return (
    <div className="space-y-4">
      {Object.entries(props).map(([key, value]) => renderField(key, value))}
    </div>
  );
}

function formatFieldName(field: string): string {
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
