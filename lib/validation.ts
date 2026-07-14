import { z } from 'zod';
import { formSchema } from './formSchema';

// Build dynamic Zod schema from formSchema
const buildValidationSchema = () => {
  const schemaFields: Record<string, z.ZodTypeAny> = {};

  // Header fields
  schemaFields.institution_name = z.string().min(1, 'Nama perguruan tinggi wajib diisi');
  schemaFields.submitted_by = z.string().min(1, 'Nama pengisi wajib diisi');
  schemaFields.position = z.string().optional();
  schemaFields.submission_date = z.string().optional();

  // Build dynamic fields from formSchema
  Object.entries(formSchema).forEach(([sectionKey, section]) => {
    section.items.forEach((item) => {
      if (item.type === 'simple' && item.fields) {
        // Simple fields - all required
        item.fields.forEach((field) => {
          if (field.type === 'number') {
            schemaFields[field.key] = z.coerce.number().min(0, 'Nilai harus positif');
          } else if (field.type === 'file_or_link') {
            schemaFields[field.key] = z.string().optional();
          } else {
            schemaFields[field.key] = z.string().optional();
          }
        });
      } else if (item.type === 'conditional') {
        // Conditional fields
        const conditionKey = `${item.id}_condition`;
        schemaFields[conditionKey] = z.string().min(1, 'Pilih salah satu opsi');

        // Fields for true condition
        if (item.fields_if_true) {
          item.fields_if_true.forEach((field) => {
            if (field.type === 'file') {
              schemaFields[field.key] = z.string().optional();
            } else {
              schemaFields[field.key] = z.string().optional();
            }
          });
        }

        // Fields for false condition
        if (item.fields_if_false) {
          item.fields_if_false.forEach((field) => {
            if (field.type === 'file') {
              schemaFields[field.key] = z.string().optional();
            } else {
              schemaFields[field.key] = z.string().optional();
            }
          });
        }
      }
    });
  });

  return z.object(schemaFields);
};

export const formValidationSchema = buildValidationSchema();

export type FormValues = z.infer<typeof formValidationSchema>;
