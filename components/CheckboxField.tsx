'use client';

import React from 'react';

interface CheckboxFieldProps {
  label: string;
  options: string[];
  otherOption?: boolean;
  otherLabel?: string;
  value: string[];
  onChange: (value: string[]) => void;
}

export default function CheckboxField({
  label,
  options,
  otherOption,
  otherLabel,
  value,
  onChange,
}: CheckboxFieldProps) {
  const handleCheckboxChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...value, option]);
    } else {
      onChange(value.filter((v) => v !== option));
    }
  };

  const handleOtherChange = (otherValue: string) => {
    const otherIndex = value.findIndex((v) => v.startsWith('other:'));
    if (otherIndex >= 0) {
      const newValue = [...value];
      newValue[otherIndex] = `other:${otherValue}`;
      onChange(newValue);
    } else if (otherValue) {
      onChange([...value, `other:${otherValue}`]);
    }
  };

  const otherValue = value.find((v) => v.startsWith('other:'))?.replace('other:', '') || '';

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={value.includes(option)}
              onChange={(e) => handleCheckboxChange(option, e.target.checked)}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">{option}</span>
          </label>
        ))}
        {otherOption && (
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={otherValue.length > 0}
              onChange={(e) => {
                if (e.target.checked && !otherValue) {
                  onChange([...value, 'other:']);
                } else if (!e.target.checked) {
                  onChange(value.filter((v) => !v.startsWith('other:')));
                }
              }}
              className="w-5 h-5 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <div className="flex-1">
              <label className="block text-sm text-gray-700 mb-1">{otherLabel}</label>
              <input
                type="text"
                value={otherValue}
                onChange={(e) => handleOtherChange(e.target.value)}
                disabled={!value.some((v) => v.startsWith('other:'))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                placeholder="Sebutkan media lainnya"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
