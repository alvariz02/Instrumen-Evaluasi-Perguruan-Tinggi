'use client';

import React, { useState } from 'react';
import type { FormSection, FormData } from '@/types/form';
import FormItemConditional from './FormItemConditional';
import FormItemSimple from './FormItemSimple';
import CheckboxField from './CheckboxField';
import TableField from './TableField';
import RadioField from './RadioField';

function parseJsonField<T>(value: unknown, fallback: T): T {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  if (value != null && typeof value === 'object') {
    return value as T;
  }
  return fallback;
}

interface FormSectionProps {
  sectionKey: string;
  section: FormSection;
  data: FormData;
  onChange: (key: string, value: string | number | null) => void;
  submissionId?: string;
  disabled?: boolean;
}

export default function FormSection({
  sectionKey,
  section,
  data,
  onChange,
  submissionId,
  disabled = false,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md mb-4 overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white hover:from-blue-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="bg-blue-600 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center text-sm">
            {sectionKey}
          </span>
          <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
        </div>
        <svg
          className={`w-5 h-5 text-gray-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="p-6 space-y-6">
          {section.items.map((item) => (
            <div key={item.id} className="space-y-4">
              <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>

              {item.type === 'conditional' ? (
                <FormItemConditional
                  item={item}
                  data={data}
                  onChange={onChange}
                  submissionId={submissionId}
                  disabled={disabled}
                />
              ) : item.type === 'simple' ? (
                <FormItemSimple
                  item={item}
                  data={data}
                  onChange={onChange}
                  submissionId={submissionId}
                  disabled={disabled}
                />
              ) : item.type === 'checkbox' ? (
                <CheckboxField
                  label={item.label || ''}
                  options={item.options || []}
                  otherOption={item.other_option}
                  otherLabel={item.other_label}
                  value={parseJsonField<string[]>(data[item.id], [])}
                  onChange={(value) => onChange(item.id, JSON.stringify(value))}
                />
              ) : item.type === 'table' ? (
                <TableField
                  columns={item.columns || []}
                  rows={item.rows || []}
                  value={parseJsonField<Record<string, string>>(data[item.id], {})}
                  onChange={(value) => onChange(item.id, JSON.stringify(value))}
                />
              ) : item.type === 'radio' ? (
                <RadioField
                  label={item.label || ''}
                  options={item.options || []}
                  value={(data[item.id] as string) || ''}
                  onChange={(value) => onChange(item.id, value)}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
