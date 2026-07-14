'use client';

import React from 'react';
import { FormItem, FormData } from '@/types/form';
import FileUploadField from './FileUploadField';

interface FormItemConditionalProps {
  item: FormItem;
  data: FormData;
  onChange: (key: string, value: string | number | null) => void;
  submissionId?: string;
  disabled?: boolean;
}

export default function FormItemConditional({
  item,
  data,
  onChange,
  submissionId,
  disabled = false,
}: FormItemConditionalProps) {
  const conditionKey = `${item.id}_condition`;
  const conditionValue = data[conditionKey] as string;
  const isFirstOption = conditionValue === item.condition_options?.[0];

  const renderField = (field: any) => {
    if (field.type === 'text') {
      return (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="text"
            value={(data[field.key] as string) || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      );
    }
    if (field.type === 'radio' && field.options) {
      return (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {field.label}
          </label>
          <div className="flex flex-wrap gap-4">
            {field.options.map((option: string) => (
              <label key={option} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={field.key}
                  value={option}
                  checked={data[field.key] === option}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  disabled={disabled}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    if (field.type === 'textarea') {
      return (
        <div key={field.key}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <textarea
            value={(data[field.key] as string) || ''}
            onChange={(e) => onChange(field.key, e.target.value)}
            disabled={disabled}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
          />
        </div>
      );
    }
    if (field.type === 'file') {
      return (
        <FileUploadField
          fieldKey={field.key}
          label={field.label}
          value={data[field.key] as string | null}
          onChange={(value) => onChange(field.key, value)}
          submissionId={submissionId}
          disabled={disabled}
        />
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {item.condition_label}
        </label>
        <div className="flex gap-4">
          {item.condition_options?.map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={conditionKey}
                value={option}
                checked={conditionValue === option}
                onChange={(e) => onChange(conditionKey, e.target.value)}
                disabled={disabled}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:opacity-50"
              />
              <span className="text-sm text-gray-700">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {conditionValue && (
        <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
          {isFirstOption && item.fields_if_true?.map(renderField)}
          {!isFirstOption && item.fields_if_false?.map(renderField)}
        </div>
      )}
    </div>
  );
}
