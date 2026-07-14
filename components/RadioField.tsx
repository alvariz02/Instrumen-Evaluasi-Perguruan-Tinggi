'use client';

import React from 'react';

interface RadioFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function RadioField({ label, options, value, onChange }: RadioFieldProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name={label}
              value={option}
              checked={value === option}
              onChange={(e) => onChange(e.target.value)}
              className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
