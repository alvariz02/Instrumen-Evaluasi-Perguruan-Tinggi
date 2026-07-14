# Instrumen Tim Kerja Kerjasama Perguruan Tinggi

Aplikasi web lengkap untuk mengisi formulir "Instrumen Tim Kerja Kerjasama Perguruan Tinggi" menggunakan Next.js 14 (App Router), TypeScript, Tailwind CSS, dan Supabase.

## Tech Stack

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** (styling penuh, responsive, modern)
- **Supabase** (Postgres database + Supabase Storage untuk upload file)
- **React Hook Form + Zod** (validasi form)
- **react-hot-toast** (notifikasi sukses/gagal)
- **Autosave** (simpan draft otomatis ke localStorage)

## Fitur

1. **Form Dinamis** - 7 bagian (A–G) dengan struktur kondisional a/b
2. **Upload File** - Upload bukti dokumen ke Supabase Storage
3. **Simpan Draft** - Simpan progress kapan saja
4. **Kirim Final** - Submit dengan validasi lengkap
5. **Autosave** - Data tersimpan otomatis di localStorage
6. **Riwayat** - Lihat daftar submission dan detail
7. **Progress Indicator** - Lihat persentase pengisian
8. **Responsive Design** - Tampilan rapi di semua device

## Struktur Data

Form terdiri dari 7 bagian besar:
- **A**: Perencanaan Strategis Kerja Sama
- **B**: Pelaksanaan Kerja Sama
- **C**: Dampak dan Manfaat Kerja Sama
- **D**: Monitoring dan Evaluasi Internal
- **E**: Administrasi dan Dokumentasi
- **F**: Kerja Sama Internasional
- **G**: Komitmen Pembentukan International Office (IO)

Setiap bagian memiliki item dengan struktur kondisional (Ya/Tidak) dan field dinamis sesuai pilihan.

## Instalasi

### 1. Clone Repository

```bash
cd instrument-timkerjasama
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase Project

1. Buat project baru di [Supabase](https://supabase.com)
2. Buka SQL Editor di Supabase Dashboard
3. Jalankan SQL dari file `supabase/schema.sql`
4. Buat Storage bucket bernama `bukti-dokumen`:
   - Buka Storage di Supabase Dashboard
   - Create new bucket dengan nama `bukti-dokumen`
   - Set sebagai Public bucket
   - Configure policies untuk public read dan authenticated write

### 4. Setup Environment Variables

1. Copy file `.env.local.example` ke `.env.local`:
```bash
cp .env.local.example .env.local
```

2. Isi dengan credentials dari Supabase:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 5. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Skema Database

### Tabel `submissions`
- `id` (UUID, primary key)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)
- `institution_name` (text)
- `submitted_by` (text)
- `position` (text, optional)
- `submission_date` (date, optional)
- `status` (text: 'draft' or 'submitted')
- `form_data` (jsonb)

### Tabel `attachments`
- `id` (UUID, primary key)
- `submission_id` (UUID, foreign key ke submissions)
- `field_key` (text)
- `file_name` (text)
- `file_path` (text)
- `file_url` (text, optional)
- `uploaded_at` (timestamptz)

### Storage Bucket
- `bukti-dokumen` - untuk menyimpan file bukti dokumen

## Penggunaan

### Mengisi Form

1. Buka halaman utama `/`
2. Isi informasi header (Nama PT, Pengisi, Jabatan, Tanggal)
3. Isi setiap bagian form (A–G) dengan membuka accordion
4. Untuk item kondisional, pilih opsi (Ya/Tidak) untuk menampilkan field yang relevan
5. Upload file bukti jika diperlukan
6. Klik "Simpan Draft" untuk menyimpan progress
7. Klik "Kirim Final" untuk submit form (validasi akan dilakukan)

### Melihat Riwayat

1. Buka halaman `/riwayat`
2. Lihat daftar semua submission
3. Klik "Lihat Detail" untuk melihat detail submission
4. Download file bukti dari detail page

### Autosave

Data form disimpan otomatis ke localStorage setiap ada perubahan. Jika browser ditutup atau reload, data akan dipulihkan saat kembali ke halaman form.

## Build untuk Production

```bash
npm run build
npm start
```

## Struktur File

```
├── app/
│   ├── layout.tsx              # Root layout dengan Toaster
│   ├── page.tsx                # Form utama
│   ├── globals.css             # Global styles
│   └── riwayat/
│       ├── page.tsx            # Daftar riwayat
│       └── [id]/page.tsx       # Detail riwayat
├── components/
│   ├── FormSection.tsx         # Komponen section form
│   ├── FormItemConditional.tsx # Item form dengan kondisi
│   ├── FormItemSimple.tsx      # Item form tanpa kondisi
│   ├── FileUploadField.tsx     # Field upload file
│   ├── ProgressBar.tsx        # Progress indicator
│   └── Header.tsx              # Header form
├── lib/
│   ├── supabase/
│   │   ├── client.ts           # Supabase client untuk browser
│   │   └── server.ts           # Supabase client untuk server
│   ├── formSchema.ts           # Schema form (JSON)
│   ├── validation.ts          # Zod validation schema
│   └── utils.ts                # Utility functions
├── types/
│   └── form.ts                 # TypeScript types
├── supabase/
│   └── schema.sql              # SQL schema untuk database
├── .env.local.example          # Example environment variables
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # Dokumentasi
```

## Catatan Penting

- Form menggunakan pendekatan satu kolom `jsonb` untuk menyimpan data form yang dinamis
- File upload disimpan di Supabase Storage bucket `bukti-dokumen`
- Row Level Security (RLS) diaktifkan dengan policy dasar untuk demo
- Untuk production, sesuaikan RLS policy sesuai kebutuhan keamanan
- Autosave ke localStorage sebagai fallback jika koneksi ke Supabase gagal

## Troubleshooting

### Error: Supabase connection failed
Pastikan environment variables sudah diisi dengan benar di `.env.local`

### Error: File upload failed
Pastikan bucket `bukti-dokumen` sudah dibuat di Supabase Storage dan policy sudah dikonfigurasi

### Error: TypeScript errors
Jalankan `npm install` untuk memastikan semua dependencies terinstall

## License

MIT
