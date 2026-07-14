'use client';

import React from 'react';
import { FormItem, FormData } from '@/types/form';
import FileUploadField from './FileUploadField';

interface FormItemSimpleProps {
  item: FormItem;
  data: FormData;
  onChange: (key: string, value: string | number | null) => void;
  submissionId?: string;
  disabled?: boolean;
}

export default function FormItemSimple({
  item,
  data,
  onChange,
  submissionId,
  disabled = false,
}: FormItemSimpleProps) {
  if (!item.fields) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-800">{item.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
      </div>
      <div className="space-y-4">
        {item.fields.map((field) => (
          <div key={field.key}>
            {field.type === 'number' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="number"
                  value={(data[field.key] as number | string) ?? ''}
                  onChange={(e) => onChange(field.key, parseInt(e.target.value) || 0)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  min="0"
                />
              </div>
            )}
            {field.type === 'text' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={(data[field.key] as number | string) ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            )}
            {field.type === 'textarea' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <textarea
                  value={(data[field.key] as number | string) ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  disabled={disabled}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 resize-none"
                />
              </div>
            )}
            {field.type === 'file' && (
              <FileUploadField
                fieldKey={field.key}
                label={field.label}
                value={data[field.key] as string | null}
                onChange={(value) => onChange(field.key, value)}
                submissionId={submissionId}
                disabled={disabled}
              />
            )}
            {field.type === 'file_or_link' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.label}
                </label>
                <input
                  type="text"
                  value={(data[field.key] as number | string) ?? ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  disabled={disabled}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  placeholder="Upload file atau masukkan tautan"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
