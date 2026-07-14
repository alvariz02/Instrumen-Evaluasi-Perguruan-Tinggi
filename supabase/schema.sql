-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  institution_name TEXT NOT NULL,
  submitted_by TEXT NOT NULL,
  position TEXT,
  submission_date DATE,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'submitted')),
  form_type TEXT DEFAULT 'tim-kerja' CHECK (form_type IN ('tim-kerja', 'humas')),
  form_data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Create attachments table
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
  field_key TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_url TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_submissions_status ON submissions(status);
CREATE INDEX IF NOT EXISTS idx_submissions_form_type ON submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_attachments_submission_id ON attachments(submission_id);
CREATE INDEX IF NOT EXISTS idx_attachments_field_key ON attachments(field_key);

-- Enable Row Level Security
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attachments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for submissions
-- Allow authenticated users to insert submissions
CREATE POLICY "Authenticated users can insert submissions"
  ON submissions FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to select their own submissions
CREATE POLICY "Authenticated users can select submissions"
  ON submissions FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to update their own submissions
CREATE POLICY "Authenticated users can update submissions"
  ON submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow anonymous users to insert (for demo purposes, remove in production)
CREATE POLICY "Anonymous users can insert submissions"
  ON submissions FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to select (for demo purposes, remove in production)
CREATE POLICY "Anonymous users can select submissions"
  ON submissions FOR SELECT
  TO anon
  USING (true);

-- Allow anonymous users to update (for demo purposes, remove in production)
CREATE POLICY "Anonymous users can update submissions"
  ON submissions FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- RLS Policies for attachments
-- Allow authenticated users to insert attachments
CREATE POLICY "Authenticated users can insert attachments"
  ON attachments FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to select attachments
CREATE POLICY "Authenticated users can select attachments"
  ON attachments FOR SELECT
  TO authenticated
  USING (true);

-- Allow anonymous users to insert attachments (for demo purposes)
CREATE POLICY "Anonymous users can insert attachments"
  ON attachments FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous users to select attachments (for demo purposes)
CREATE POLICY "Anonymous users can select attachments"
  ON attachments FOR SELECT
  TO anon
  USING (true);

-- Create function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for submissions
DROP TRIGGER IF EXISTS update_submissions_updated_at ON submissions;
CREATE TRIGGER update_submissions_updated_at
  BEFORE UPDATE ON submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket setup
-- Create bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('bukti-dokumen', 'bukti-dokumen', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for bukti-dokumen bucket

-- Allow public read access
CREATE POLICY "Public Read bukti-dokumen"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bukti-dokumen');

-- Allow authenticated users to upload
CREATE POLICY "Authenticated Upload bukti-dokumen"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'bukti-dokumen');

-- Allow authenticated users to update
CREATE POLICY "Authenticated Update bukti-dokumen"
ON storage.objects FOR UPDATE
TO authenticated
WITH CHECK (bucket_id = 'bukti-dokumen');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated Delete bukti-dokumen"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'bukti-dokumen');

-- Allow anonymous users to upload (for demo purposes, remove in production)
CREATE POLICY "Anonymous Upload bukti-dokumen"
ON storage.objects FOR INSERT
TO anon
WITH CHECK (bucket_id = 'bukti-dokumen');

-- Allow anonymous users to delete (for demo purposes, remove in production)
CREATE POLICY "Anonymous Delete bukti-dokumen"
ON storage.objects FOR DELETE
TO anon
USING (bucket_id = 'bukti-dokumen');
