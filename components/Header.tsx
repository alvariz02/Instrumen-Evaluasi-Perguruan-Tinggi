'use client';

import React from 'react';
import { FormHeaderData } from '@/types/form';

interface HeaderProps {
  data: FormHeaderData;
  onChange: (field: keyof FormHeaderData, value: string) => void;
  readOnly?: boolean;
}

export default function Header({ data, onChange, readOnly = false }: HeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Informasi Pengisi</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Perguruan Tinggi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.institution_name}
            onChange={(e) => onChange('institution_name', e.target.value)}
            readOnly={readOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Masukkan nama perguruan tinggi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nama Pengisi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.submitted_by}
            onChange={(e) => onChange('submitted_by', e.target.value)}
            readOnly={readOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Masukkan nama pengisi"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Jabatan
          </label>
          <input
            type="text"
            value={data.position}
            onChange={(e) => onChange('position', e.target.value)}
            readOnly={readOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            placeholder="Masukkan jabatan"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tanggal Pengisian
          </label>
          <input
            type="date"
            value={data.submission_date}
            onChange={(e) => onChange('submission_date', e.target.value)}
            readOnly={readOnly}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
        </div>
      </div>
    </div>
  );
}
