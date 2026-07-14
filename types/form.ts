export type FieldType = 'text' | 'number' | 'textarea' | 'file' | 'file_or_link' | 'radio';

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
}

export interface FormItem {
  id: string;
  title: string;
  description: string;
  type?: 'simple' | 'conditional' | 'checkbox' | 'table' | 'radio';
  condition_label?: string;
  condition_options?: string[];
  fields?: FormField[];
  fields_if_true?: FormField[];
  fields_if_false?: FormField[];
  label?: string;
  options?: string[];
  other_option?: boolean;
  other_label?: string;
  columns?: string[];
  rows?: Array<{ id: string; values: string[] }>;
}

export interface FormSection {
  title: string;
  items: FormItem[];
}

export interface FormSchema {
  [key: string]: FormSection;
}

export interface FormData {
  [key: string]: string | number | null | string[] | Record<string, string>;
}

export type FormType = 'tim-kerja' | 'humas' | 'lappkerma';

export interface Submission {
  id: string;
  created_at: string;
  updated_at: string | null;
  institution_name: string;
  submitted_by: string;
  position: string | null;
  submission_date: string | null;
  status: 'draft' | 'submitted';
  form_type?: FormType;
  form_data: FormData;
}

export interface Attachment {
  id: string;
  submission_id: string;
  field_key: string;
  file_name: string;
  file_path: string;
  file_url: string | null;
  uploaded_at: string;
}

export interface FormHeaderData {
  institution_name: string;
  submitted_by: string;
  position: string;
  submission_date: string;
}
