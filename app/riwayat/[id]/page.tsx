import { createServerClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getFormSchema, getFormTypeLabel } from '@/lib/formSchema';
import type { FormItem } from '@/types/form';

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

async function getSubmission(id: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function getAttachments(submissionId: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('attachments')
    .select('*')
    .eq('submission_id', submissionId);

  if (error) {
    console.error('Error fetching attachments:', error);
    return [];
  }

  return data || [];
}

function renderItemContent(
  item: FormItem,
  formData: Record<string, unknown>,
  getFileUrl: (fieldKey: string) => string | null,
  attachmentMap: Map<string, { file_name: string }>
) {
  if (item.type === 'simple' && item.fields) {
    return (
      <div className="space-y-3 sm:space-y-4">
        {item.fields.map((field) => (
          <div key={field.key}>
            <span className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
              {field.label}
            </span>
            {field.type === 'file' || field.type === 'file_or_link' ? (
              (() => {
                const fileUrl = getFileUrl(field.key);
                const attachment = attachmentMap.get(field.key);
                return fileUrl ? (
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm break-all"
                  >
                    {attachment?.file_name || field.key}
                  </a>
                ) : (
                  <span className="text-gray-500 text-xs sm:text-sm">
                    {(formData[field.key] as string) || '-'}
                  </span>
                );
              })()
            ) : (
              <p className="text-gray-900 text-xs sm:text-sm break-words">
                {(formData[field.key] as string) || '-'}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (item.type === 'conditional') {
    const conditionValue = formData[`${item.id}_condition`];
    const isFirstOption = conditionValue === item.condition_options?.[0];
    const relevantFields = isFirstOption ? item.fields_if_true : item.fields_if_false;

    return (
      <div className="space-y-3 sm:space-y-4">
        <div>
          <span className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
            {item.condition_label}
          </span>
          <p className="text-gray-900 text-xs sm:text-sm">{(conditionValue as string) || '-'}</p>
        </div>

        {relevantFields && relevantFields.length > 0 && (
          <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4 border-t border-gray-200">
            {relevantFields.map((field) => (
              <div key={field.key}>
                <span className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
                  {field.label}
                </span>
                {field.type === 'file' ? (
                  (() => {
                    const fileUrl = getFileUrl(field.key);
                    const attachment = attachmentMap.get(field.key);
                    return fileUrl ? (
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm break-all"
                      >
                        {attachment?.file_name || field.key}
                      </a>
                    ) : (
                      <span className="text-gray-500 text-xs sm:text-sm">Tidak ada file</span>
                    );
                  })()
                ) : (
                  <p className="text-gray-900 text-xs sm:text-sm whitespace-pre-wrap break-words">
                    {(formData[field.key] as string) || '-'}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.type === 'checkbox') {
    const selected = parseJsonField<string[]>(formData[item.id], []);
    const displayValues = selected.map((value) =>
      value.startsWith('other:') ? value.replace('other:', 'Lainnya: ') : value
    );

    return (
      <div>
        <span className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
          {item.label}
        </span>
        {displayValues.length > 0 ? (
          <ul className="list-disc list-inside text-xs sm:text-sm text-gray-900 space-y-1">
            {displayValues.map((value) => (
              <li key={value} className="break-words">{value}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-xs sm:text-sm">-</p>
        )}
      </div>
    );
  }

  if (item.type === 'table') {
    const tableData = parseJsonField<Record<string, string>>(formData[item.id], {});

    return (
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <table className="w-full border-collapse border border-gray-300 text-xs sm:text-sm mx-4 sm:mx-0">
          <thead>
            <tr className="bg-gray-100">
              {(item.columns || []).map((column) => (
                <th key={column} className="border border-gray-300 px-2 sm:px-4 py-2 text-left">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(item.rows || []).map((row) => (
              <tr key={row.id}>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">{row.values[0]}</td>
                <td className="border border-gray-300 px-2 sm:px-4 py-2">
                  {tableData[`${row.id}_1`] || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (item.type === 'radio') {
    return (
      <div>
        <span className="text-xs sm:text-sm font-medium text-gray-700 block mb-1">
          {item.label}
        </span>
        <p className="text-gray-900 text-xs sm:text-sm">{(formData[item.id] as string) || '-'}</p>
      </div>
    );
  }

  return null;
}

export default async function SubmissionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const submission = await getSubmission(params.id);

  if (!submission) {
    notFound();
  }

  const attachments = await getAttachments(params.id);
  const attachmentMap = new Map(
    attachments.map((att) => [att.field_key, att])
  );
  const formSchema = getFormSchema(submission.form_type);

  const getFileUrl = (fieldKey: string) => {
    const attachment = attachmentMap.get(fieldKey);
    if (!attachment) return null;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    return `${supabaseUrl}/storage/v1/object/public/bukti-dokumen/${attachment.file_path}`;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <Link
            href="/riwayat"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-3 sm:mb-4 text-sm sm:text-base"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Riwayat
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            Detail Pengisian Instrumen
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            {getFormTypeLabel(submission.form_type)}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Informasi Pengisi
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Nama PT:</span>
              <p className="text-sm sm:text-base text-gray-900 break-words">{submission.institution_name}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Pengisi:</span>
              <p className="text-sm sm:text-base text-gray-900 break-words">{submission.submitted_by}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Jabatan:</span>
              <p className="text-sm sm:text-base text-gray-900 break-words">{submission.position || '-'}</p>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Tanggal:</span>
              <p className="text-sm sm:text-base text-gray-900">
                {submission.submission_date
                  ? new Date(submission.submission_date).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : '-'}
              </p>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Status:</span>
              <span
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  submission.status === 'submitted'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {submission.status === 'submitted' ? 'Terkirim' : 'Draft'}
              </span>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-medium text-gray-500 block mb-1">Dibuat:</span>
              <p className="text-sm sm:text-base text-gray-900">
                {new Date(submission.created_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>

        {Object.entries(formSchema).map(([sectionKey, section]) => (
          <div key={sectionKey} className="bg-white rounded-lg shadow-md mb-3 sm:mb-4 overflow-hidden">
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="bg-blue-600 text-white font-bold rounded-full w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm">
                  {sectionKey}
                </span>
                <h2 className="text-base sm:text-lg font-semibold text-gray-800">{section.title}</h2>
              </div>
            </div>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              {section.items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-3 sm:p-4">
                  <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{item.description}</p>
                  {renderItemContent(item, submission.form_data, getFileUrl, attachmentMap)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
