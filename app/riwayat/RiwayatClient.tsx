'use client';

import React from 'react';
import Link from 'next/link';
import { formSchemaTimKerja, formSchemaHumas, getFormTypeLabel } from '@/lib/formSchema';
import type { FormSchema, FormType } from '@/types/form';

interface Submission {
  id: string;
  institution_name: string;
  submitted_by: string;
  position?: string;
  submission_date?: string;
  status: string;
  form_type?: string;
  created_at: string;
  form_data?: Record<string, any>;
}

interface RiwayatClientProps {
  submissions: Submission[];
  activeType?: FormType;
  counts: {
    all: number;
    timKerja: number;
    humas: number;
  };
}

const allSchemas: FormSchema[] = [formSchemaTimKerja, formSchemaHumas];

const filterTabs: Array<{ key: FormType | 'all'; label: string; href: string }> = [
  // { key: 'all', label: 'Semua', href: '/riwayat' },
  { key: 'tim-kerja', label: 'Tim Kerja', href: '/riwayat?type=tim-kerja' },
  { key: 'humas', label: 'HUMAS', href: '/riwayat?type=humas' },
];

export default function RiwayatClient({ submissions, activeType, counts }: RiwayatClientProps) {
  const getCount = (key: FormType | 'all') => {
    if (key === 'all') return counts.all;
    if (key === 'humas') return counts.humas;
    return counts.timKerja;
  };

  const emptyMessage =
    activeType === 'humas'
      ? 'Belum ada data pengisian instrumen HUMAS.'
      : activeType === 'tim-kerja'
        ? 'Belum ada data pengisian instrumen Tim Kerja.'
        : 'Belum ada data pengisian.';

  const getFieldLabel = (fieldKey: string): string => {
    if (fieldKey.endsWith('_condition')) {
      const itemId = fieldKey.replace('_condition', '');
      for (const schema of allSchemas) {
        for (const section of Object.values(schema)) {
          const item = section.items.find((i) => i.id === itemId);
          if (item?.condition_label) {
            return item.condition_label;
          }
        }
      }
      return fieldKey.replace(/_/g, ' ').toUpperCase();
    }

    for (const schema of allSchemas) {
      for (const section of Object.values(schema)) {
        for (const item of section.items) {
          if (item.id === fieldKey) {
            return item.title;
          }
          if (item.type === 'simple' && item.fields) {
            const field = item.fields.find((f) => f.key === fieldKey);
            if (field) return field.label;
          }
          if (item.type === 'conditional') {
            const field = [...(item.fields_if_true || []), ...(item.fields_if_false || [])].find(
              (f) => f.key === fieldKey
            );
            if (field) return field.label;
          }
        }
      }
    }

    return fieldKey.replace(/_/g, ' ').toUpperCase();
  };

  const formatCellValue = (value: any, key: string): string => {
    if (value === null || value === undefined) return '-';

    // Handle array data (Checkbox fields like Media Publikasi)
    if (Array.isArray(value)) {
      return value
        .map((item) => {
          if (typeof item === 'string' && item.startsWith('other:')) {
            return item.replace('other:', '');
          }
          return item;
        })
        .join('\n');
    }

    // Handle table data (Username Media Sosial - object with row_col pattern)
    if (typeof value === 'object' && !Array.isArray(value)) {
      const entries = Object.entries(value);
      if (entries.length > 0 && entries.some(([k]) => /row\d+_\d+/.test(k))) {
        // Get the media sosial schema to map rows properly
        let mediaSocialRows: Array<{ id: string; values: string[] }> = [];
        for (const schema of allSchemas) {
          for (const section of Object.values(schema)) {
            const item = section.items.find((i) => i.id === 'I4' && i.type === 'table');
            if (item?.rows) {
              mediaSocialRows = item.rows;
              break;
            }
          }
        }

        // Format table data as "Media: Username" on each line
        if (mediaSocialRows.length > 0) {
          return mediaSocialRows
            .map((row) => {
              const username = value[`${row.id}_1`];
              const media = row.values[0];
              return username ? `${media}: ${username}` : null;
            })
            .filter(Boolean)
            .join('\n');
        }
        return Object.entries(value)
          .map(([k, v]) => v)
          .filter(Boolean)
          .join('\n');
      }
      return String(value);
    }

    // Handle file paths - show file address only
    if (typeof value === 'string' && (value.includes('/') || value.includes('\\'))) {
      return value;
    }

    if (typeof value === 'string') return value;
    return String(value);
  };

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    const allFormKeys = new Set<string>();
    submissions.forEach((sub) => {
      if (sub.form_data) {
        Object.keys(sub.form_data).forEach((key) => allFormKeys.add(key));
      }
    });

    const sortedFormKeys = Array.from(allFormKeys).sort();

    const headers = [
      'ID',
      'Jenis Instrumen',
      'Nama Perguruan Tinggi',
      'Pengisi',
      'Jabatan',
      'Tanggal Pengisian',
      'Status',
      'Tanggal Dibuat',
      ...sortedFormKeys.map((key) => getFieldLabel(key)),
    ];

    const rows = submissions.map((sub) => {
      const baseData = [
        sub.id,
        getFormTypeLabel(sub.form_type),
        sub.institution_name,
        sub.submitted_by,
        sub.position || '-',
        sub.submission_date || '-',
        sub.status === 'submitted' ? 'Terkirim' : 'Draft',
        new Date(sub.created_at).toLocaleDateString('id-ID'),
      ];

      const formDataValues = sortedFormKeys.map((key) => {
        const value = sub.form_data?.[key];
        return formatCellValue(value, key);
      });

      return [...baseData, ...formDataValues];
    });

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    // link.setAttribute('download', `riwayat_${activeType || 'semua'}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filterTabs.map((tab) => {
                const isActive =
                  tab.key === 'all' ? !activeType : activeType === tab.key;

                return (
                  <Link
                    key={tab.key}
                    href={tab.href}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      isActive
                        ? tab.key === 'humas'
                          ? 'bg-green-600 text-white'
                          : tab.key === 'tim-kerja'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        isActive ? 'bg-white/20' : 'bg-white text-gray-600'
                      }`}
                    >
                      {getCount(tab.key)}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Isi Instrumen Baru
              </Link>
              {submissions.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Export CSV
                </button>
              )}
            </div>
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 text-lg">{emptyMessage}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              {activeType === 'humas' && (
                <Link
                  href="/form/humas"
                  className="inline-block bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Isi Instrumen HUMAS
                </Link>
              )}
              {activeType === 'tim-kerja' && (
                <Link
                  href="/form/tim-kerja"
                  className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Isi Instrumen Tim Kerja
                </Link>
              )}
              {!activeType && (
                <Link
                  href="/"
                  className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Mulai Mengisi
                </Link>
              )}
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jenis Instrumen
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Perguruan Tinggi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pengisi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.form_type === 'humas'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {getFormTypeLabel(submission.form_type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {submission.institution_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {submission.submitted_by}
                    </div>
                    {submission.position && (
                      <div className="text-sm text-gray-500">
                        {submission.position}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        submission.status === 'submitted'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {submission.status === 'submitted' ? 'Terkirim' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/riwayat/${submission.id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
