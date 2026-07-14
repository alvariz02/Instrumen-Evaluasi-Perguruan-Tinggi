import { FormSchema, FormData, FormHeaderData } from '@/types/form';

function parseJsonValue<T>(value: unknown, fallback: T): T {
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

export function calculateFormProgress(
  schema: FormSchema,
  headerData: FormHeaderData,
  formData: FormData
): number {
  let totalFields = 0;
  let filledFields = 0;

  totalFields += 2;
  if (headerData.institution_name) filledFields++;
  if (headerData.submitted_by) filledFields++;

  Object.values(schema).forEach((section) => {
    section.items.forEach((item) => {
      if (item.type === 'simple' && item.fields) {
        totalFields += item.fields.length;
        item.fields.forEach((field) => {
          if (formData[field.key]) filledFields++;
        });
      } else if (item.type === 'conditional') {
        totalFields += 1;
        const conditionKey = `${item.id}_condition`;
        if (formData[conditionKey]) filledFields++;

        const isFirstOption = formData[conditionKey] === item.condition_options?.[0];
        const relevantFields = isFirstOption ? item.fields_if_true : item.fields_if_false;
        if (relevantFields) {
          totalFields += relevantFields.length;
          relevantFields.forEach((field) => {
            if (formData[field.key]) filledFields++;
          });
        }
      } else if (item.type === 'checkbox') {
        totalFields += 1;
        const selected = parseJsonValue<string[]>(formData[item.id], []);
        if (selected.length > 0) filledFields++;
      } else if (item.type === 'table') {
        const rows = item.rows || [];
        totalFields += rows.length;
        const tableData = parseJsonValue<Record<string, string>>(formData[item.id], {});
        rows.forEach((row) => {
          if (tableData[`${row.id}_1`]) filledFields++;
        });
      } else if (item.type === 'radio') {
        totalFields += 1;
        if (formData[item.id]) filledFields++;
      }
    });
  });

  return totalFields > 0 ? (filledFields / totalFields) * 100 : 0;
}
