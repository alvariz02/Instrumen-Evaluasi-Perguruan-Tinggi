'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { formSchemaTimKerja, sectionKeysTimKerja } from '@/lib/formSchema';
import { calculateFormProgress } from '@/lib/formProgress';
import { FormData, FormHeaderData } from '@/types/form';
import Header from '@/components/Header';
import ProgressBar from '@/components/ProgressBar';
import FormSection from '@/components/FormSection';
import { createBrowserClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function TimKerjaForm() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [headerData, setHeaderData] = useState<FormHeaderData>({
    institution_name: '',
    submitted_by: '',
    position: '',
    submission_date: new Date().toISOString().split('T')[0],
  });

  const [formData, setFormData] = useState<FormData>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const progress = calculateFormProgress(formSchemaTimKerja, headerData, formData);

  // Autosave to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('timKerjaFormDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setHeaderData(parsed.headerData || headerData);
        setFormData(parsed.formData || formData);
        setSubmissionId(parsed.submissionId || null);
      } catch (e) {
        console.error('Error loading draft:', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timKerjaFormDraft', JSON.stringify({
      headerData,
      formData,
      submissionId,
    }));
  }, [headerData, formData, submissionId]);

  const handleHeaderChange = (field: keyof FormHeaderData, value: string) => {
    setHeaderData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormChange = (key: string, value: string | number | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveDraft = async () => {
    if (!headerData.institution_name || !headerData.submitted_by) {
      toast.error('Nama PT dan nama pengisi wajib diisi');
      return;
    }

    setSaving(true);
    try {
      const submissionData = {
        institution_name: headerData.institution_name,
        submitted_by: headerData.submitted_by,
        position: headerData.position || null,
        submission_date: headerData.submission_date || null,
        status: 'draft' as const,
        form_type: 'tim-kerja' as const,
        form_data: formData,
      };

      let result;
      if (submissionId) {
        result = await supabase
          .from('submissions')
          .update(submissionData)
          .eq('id', submissionId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('submissions')
          .insert(submissionData)
          .select()
          .single();
        if (result.data) {
          setSubmissionId(result.data.id);
        }
      }

      if (result.error) throw result.error;
      toast.success('Draft berhasil disimpan');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Gagal menyimpan draft');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async () => {
    if (!headerData.institution_name || !headerData.submitted_by) {
      toast.error('Nama PT dan nama pengisi wajib diisi');
      return;
    }

    // Validate all conditional items have a selection
    let hasUnselected = false;
    Object.entries(formSchemaTimKerja).forEach(([_, section]) => {
      section.items.forEach((item) => {
        if (item.type === 'conditional') {
          const conditionKey = `${item.id}_condition`;
          if (!formData[conditionKey]) {
            hasUnselected = true;
          }
        }
      });
    });

    if (hasUnselected) {
      toast.error('Mohon lengkapi semua pilihan kondisional');
      return;
    }

    setSubmitting(true);
    try {
      const submissionData = {
        institution_name: headerData.institution_name,
        submitted_by: headerData.submitted_by,
        position: headerData.position || null,
        submission_date: headerData.submission_date || null,
        status: 'submitted' as const,
        form_type: 'tim-kerja' as const,
        form_data: formData,
      };

      let result;
      if (submissionId) {
        result = await supabase
          .from('submissions')
          .update(submissionData)
          .eq('id', submissionId)
          .select()
          .single();
      } else {
        result = await supabase
          .from('submissions')
          .insert(submissionData)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      // Clear draft and reset form
      localStorage.removeItem('timKerjaFormDraft');
      setHeaderData({
        institution_name: '',
        submitted_by: '',
        position: '',
        submission_date: new Date().toISOString().split('T')[0],
      });
      setFormData({});
      setSubmissionId(null);
      toast.success('Form berhasil dikirim');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error('Gagal mengirim form');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium mb-4"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali
          </button>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Instrumen Tim Kerja Kerjasama Perguruan Tinggi
          </h1>
          <p className="text-gray-600">
            Silakan isi formulir di bawah ini dengan lengkap dan benar.
          </p>
        </div>

        <ProgressBar progress={progress} />

        <Header data={headerData} onChange={handleHeaderChange} />

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          {sectionKeysTimKerja.map((key) => (
            <FormSection
              key={key}
              sectionKey={key}
              section={formSchemaTimKerja[key]}
              data={formData}
              onChange={handleFormChange}
              submissionId={submissionId || undefined}
            />
          ))}

          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={handleSaveDraft}
              disabled={saving}
              className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
            >
              {saving ? 'Menyimpan...' : 'Simpan Draft'}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
            >
              {submitting ? 'Mengirim...' : 'Kirim Final'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => router.push('/riwayat?type=tim-kerja')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Lihat Riwayat Tim Kerja
          </button>
        </div>
      </div>
    </div>
  );
}
