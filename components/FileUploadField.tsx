'use client';

import React, { useState } from 'react';
import { createBrowserClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

interface FileUploadFieldProps {
  fieldKey: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  submissionId?: string;
  disabled?: boolean;
}

export default function FileUploadField({
  fieldKey,
  label,
  value,
  onChange,
  submissionId,
  disabled = false,
}: FileUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createBrowserClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${fieldKey}_${Date.now()}.${fileExt}`;
      const filePath = `${submissionId || 'temp'}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('bukti-dokumen')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw new Error(uploadError.message || 'Upload failed');
      }

      const { data: { publicUrl } } = supabase.storage
        .from('bukti-dokumen')
        .getPublicUrl(filePath);

      onChange(filePath);
      toast.success('File berhasil diupload');
    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Gagal mengupload file';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange(null);
    toast.success('File dihapus');
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {value ? (
        <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <span className="text-sm text-gray-600 flex-1 truncate">
            {value.split('/').pop()}
          </span>
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Hapus
            </button>
          )}
        </div>
      ) : (
        <div className="relative">
          <input
            type="file"
            onChange={handleFileUpload}
            disabled={disabled || uploading}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-md">
              <span className="text-sm text-blue-600">Mengupload...</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
