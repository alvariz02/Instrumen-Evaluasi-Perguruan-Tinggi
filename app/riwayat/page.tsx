import { createServerClient } from '@/lib/supabase/server';
import RiwayatClient from './RiwayatClient';
import type { FormType } from '@/types/form';

async function getSubmissions(formType?: FormType) {
  const supabase = createServerClient();
  let query = supabase
    .from('submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (formType) {
    query = query.eq('form_type', formType);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }

  return data || [];
}

async function getCounts() {
  const supabase = createServerClient();
  const { data, error } = await supabase.from('submissions').select('form_type');

  if (error) {
    return { all: 0, timKerja: 0, humas: 0 };
  }

  const rows = data || [];
  return {
    all: rows.length,
    timKerja: rows.filter((r) => r.form_type !== 'humas').length,
    humas: rows.filter((r) => r.form_type === 'humas').length,
  };
}

export default async function RiwayatPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const activeType =
    searchParams.type === 'humas' || searchParams.type === 'tim-kerja'
      ? (searchParams.type as FormType)
      : undefined;

  const [submissions, counts] = await Promise.all([
    getSubmissions(activeType),
    getCounts(),
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Riwayat Pengisian Instrumen
          </h1>
          <p className="text-gray-600">
            Daftar pengisian instrumen Tim Kerja dan Hubungan Masyarakat (HUMAS).
          </p>
        </div>

        <RiwayatClient
          submissions={submissions}
          activeType={activeType}
          counts={counts}
        />
      </div>
    </div>
  );
}
