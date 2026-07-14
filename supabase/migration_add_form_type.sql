-- Migration: tambah kolom form_type untuk membedakan instrumen Tim Kerja, HUMAS, dan LAPPKERMA
-- Jalankan di Supabase SQL Editor jika database sudah ada sebelumnya

ALTER TABLE submissions
ADD COLUMN IF NOT EXISTS form_type TEXT DEFAULT 'tim-kerja';

ALTER TABLE submissions
DROP CONSTRAINT IF EXISTS submissions_form_type_check;

ALTER TABLE submissions
ADD CONSTRAINT submissions_form_type_check
CHECK (form_type IN ('tim-kerja', 'humas', 'lappkerma'));

CREATE INDEX IF NOT EXISTS idx_submissions_form_type ON submissions(form_type);
