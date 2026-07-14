import { FormSchema } from '@/types/form';

export const formSchemaTimKerja: FormSchema = {
  A: {
    title: 'Perencanaan Strategis Kerja Sama',
    items: [
      {
        id: 'A1',
        title: 'Dokumen Perencanaan Strategis Kerja Sama',
        description: 'Ketersediaan dokumen perencanaan strategis kerja sama (Renstra/RKT bidang kerja sama).',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'proses_penyusunan', label: 'Uraikan proses/tahapan penyusunan dokumen perencanaan kerja sama (melibatkan unit terkait, analisis kebutuhan, penetapan prioritas, dll)', type: 'textarea' },
          { key: 'bukti_dokumen', label: 'Lampirkan bukti dokumen (Renstra/RKT kerja sama)', type: 'file' }
        ],
        fields_if_false: [
          { key: 'alasan_belum_tersusun', label: 'Uraikan alasan belum tersusunnya dokumen', type: 'textarea' },
          { key: 'rencana_tindak_lanjut', label: 'Jelaskan rencana/tindak lanjut penyusunan ke depan', type: 'textarea' }
        ]
      },
      {
        id: 'A2',
        title: 'Keselarasan dengan Visi dan Misi Perguruan Tinggi',
        description: 'Tingkat keselarasan dokumen dan program kerja sama dengan visi dan misi perguruan tinggi.',
        type: 'conditional',
        condition_label: 'Status Keselarasan',
        condition_options: ['Selaras', 'Belum selaras'],
        fields_if_true: [
          { key: 'bentuk_keselarasan', label: 'Uraikan bentuk keselarasan (keterkaitan dengan visi, misi, tujuan strategis, IKU/IKI, MBKM, dll)', type: 'textarea' },
          { key: 'contoh_implementasi', label: 'Sertakan contoh implementasi', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'penyebab_ketidaksesuaian', label: 'Uraikan penyebab ketidaksesuaian', type: 'textarea' },
          { key: 'rencana_perbaikan', label: 'Jelaskan rencana perbaikan ke depan', type: 'textarea' },
          { key: 'bukti_pendukung', label: 'Lampirkan bukti pendukung', type: 'file' }
        ]
      },
      {
        id: 'A3',
        title: 'Keterlibatan Penyelenggara/Yayasan',
        description: 'Bentuk keterlibatan penyelenggara/yayasan dalam perencanaan kerja sama perguruan tinggi.',
        type: 'conditional',
        condition_label: 'Status Keterlibatan',
        condition_options: ['Terlibat', 'Tidak terlibat'],
        fields_if_true: [
          { key: 'bentuk_keterlibatan', label: 'Uraikan bentuk keterlibatan (rapat koordinasi, FGD, workshop, persetujuan kebijakan, dll)', type: 'textarea' },
          { key: 'bukti_keterlibatan', label: 'Lampirkan bukti (notulensi, undangan, dokumentasi)', type: 'file' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_terlibat', label: 'Uraikan alasan tidak adanya keterlibatan', type: 'textarea' },
          { key: 'rencana_peningkatan', label: 'Jelaskan rencana peningkatan keterlibatan ke depan', type: 'textarea' }
        ]
      }
    ]
  },
  B: {
    title: 'Pelaksanaan Kerja Sama',
    items: [
      {
        id: 'B1',
        title: 'Status Dokumen Kerja Sama',
        description: 'Jumlah dan status dokumen kerja sama yang dimiliki perguruan tinggi.',
        type: 'simple',
        fields: [
          { key: 'dokumen_aktif', label: 'Dokumen aktif (MoU/PKS dalam dan luar negeri)', type: 'number' },
          { key: 'dokumen_tidak_aktif', label: 'Dokumen tidak aktif/kedaluwarsa', type: 'number' },
          { key: 'bukti_status_dokumen', label: 'Lampirkan bukti (daftar kerja sama, laporan kegiatan, atau tautan LAPKERMA)', type: 'file_or_link' }
        ]
      },
      {
        id: 'B2',
        title: 'Realisasi Program Kerja Sama',
        description: 'Tingkat realisasi program kerja sama berdasarkan MoU/PKS yang telah ditandatangani.',
        type: 'conditional',
        condition_label: 'Status Realisasi',
        condition_options: ['Terealisasi', 'Belum terealisasi'],
        fields_if_true: [
          { key: 'bentuk_kegiatan', label: 'Uraikan bentuk kegiatan (pertukaran mahasiswa/dosen, magang, penelitian bersama, dll)', type: 'textarea' },
          { key: 'capaian_output', label: 'Jelaskan capaian/output kegiatan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_realisasi', label: 'Uraikan kendala yang dihadapi (internal/eksternal)', type: 'textarea' },
          { key: 'rencana_tindak_lanjut_realisasi', label: 'Jelaskan rencana tindak lanjut', type: 'textarea' }
        ]
      },
      {
        id: 'B3',
        title: 'Kejelasan Peran dan Tanggung Jawab',
        description: 'Kejelasan pembagian peran dan tanggung jawab para pihak dalam pelaksanaan kerja sama.',
        type: 'conditional',
        condition_label: 'Status Kejelasan',
        condition_options: ['Jelas', 'Belum jelas'],
        fields_if_true: [
          { key: 'mekanisme_pembagian_peran', label: 'Uraikan mekanisme pembagian peran (dalam MoU/PKS atau dokumen turunan)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_peran', label: 'Uraikan kendala yang dihadapi', type: 'textarea' },
          { key: 'rencana_perbaikan_peran', label: 'Jelaskan rencana perbaikan ke depan', type: 'textarea' }
        ]
      }
    ]
  },
  C: {
    title: 'Dampak dan Manfaat Kerja Sama',
    items: [
      {
        id: 'C1',
        title: 'Dampak terhadap Tridharma Perguruan Tinggi',
        description: 'Dampak kerja sama terhadap pelaksanaan tridharma perguruan tinggi.',
        type: 'conditional',
        condition_label: 'Status Dampak',
        condition_options: ['Ada dampak', 'Belum terlihat dampak'],
        fields_if_true: [
          { key: 'kontribusi_tridharma', label: 'Uraikan kontribusi pada pendidikan, penelitian, dan pengabdian kepada masyarakat', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_dampak', label: 'Uraikan kendala dan rencana perbaikan', type: 'textarea' },
          { key: 'bukti_kegiatan_laporan', label: 'Lampirkan bukti kegiatan/laporan', type: 'file' }
        ]
      },
      {
        id: 'C2',
        title: 'Peningkatan Reputasi dan Jejaring',
        description: 'Kontribusi kerja sama terhadap peningkatan reputasi dan jejaring institusi.',
        type: 'conditional',
        condition_label: 'Status Peningkatan',
        condition_options: ['Ada peningkatan', 'Belum ada peningkatan'],
        fields_if_true: [
          { key: 'bentuk_peningkatan', label: 'Uraikan bentuk peningkatan (publikasi, ranking, pengakuan, jejaring internasional, dll)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_reputasi', label: 'Uraikan kendala dan rencana perbaikan', type: 'textarea' },
          { key: 'bukti_pendukung_reputasi', label: 'Lampirkan bukti pendukung', type: 'file' }
        ]
      },
      {
        id: 'C3',
        title: 'Manfaat bagi Sivitas Akademika',
        description: 'Manfaat kerja sama bagi mahasiswa, dosen, dan institusi.',
        type: 'conditional',
        condition_label: 'Status Manfaat',
        condition_options: ['Terdapat manfaat', 'Belum terdapat manfaat'],
        fields_if_true: [
          { key: 'manfaat_dirasakan', label: 'Uraikan manfaat yang dirasakan (kompetensi mahasiswa, publikasi dosen, peluang kerja, dll)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_manfaat', label: 'Uraikan kendala dan rencana perbaikan', type: 'textarea' },
          { key: 'bukti_kuesioner', label: 'Lampirkan bukti (kuesioner, wawancara, testimoni)', type: 'file' }
        ]
      }
    ]
  },
  D: {
    title: 'Monitoring dan Evaluasi Internal',
    items: [
      {
        id: 'D1',
        title: 'Mekanisme Monitoring dan Evaluasi',
        description: 'Ketersediaan dan pelaksanaan mekanisme monitoring dan evaluasi kerja sama secara berkala.',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'mekanisme_monev', label: 'Uraikan mekanisme, frekuensi, dan instrumen yang digunakan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_rencana_monev', label: 'Uraikan alasan dan rencana pengembangan sistem monev', type: 'textarea' },
          { key: 'bukti_pendukung_monev', label: 'Lampirkan bukti pendukung', type: 'file' }
        ]
      },
      {
        id: 'D2',
        title: 'Tindak Lanjut Hasil Evaluasi',
        description: 'Tindak lanjut atas hasil monitoring dan evaluasi kerja sama.',
        type: 'conditional',
        condition_label: 'Status Tindak Lanjut',
        condition_options: ['Terdapat tindak lanjut', 'Belum terdapat tindak lanjut'],
        fields_if_true: [
          { key: 'bentuk_perbaikan', label: 'Uraikan bentuk perbaikan yang dilakukan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_tindak_lanjut', label: 'Uraikan kendala dan rencana perbaikan', type: 'textarea' },
          { key: 'bukti_implementasi_rekomendasi', label: 'Lampirkan bukti implementasi rekomendasi', type: 'file' }
        ]
      }
    ]
  },
  E: {
    title: 'Administrasi dan Dokumentasi',
    items: [
      {
        id: 'E1',
        title: 'Kelengkapan Dokumen Administratif',
        description: 'Kelengkapan dokumen legal dan administratif kerja sama.',
        type: 'conditional',
        condition_label: 'Status Kelengkapan',
        condition_options: ['Lengkap', 'Belum lengkap'],
        fields_if_true: [
          { key: 'rincian_dokumen', label: 'Rincikan dokumen yang tersedia (MoU, PKS/MoA, TOR, laporan, notulensi, dll)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kekurangan_dokumen', label: 'Uraikan kekurangan yang ada', type: 'textarea' },
          { key: 'rencana_pemenuhan_dokumen', label: 'Jelaskan rencana pemenuhan dokumen', type: 'textarea' }
        ]
      },
      {
        id: 'E2',
        title: 'Upload Dokumen ke LAPPKERMA',
        description: 'Apakah seluruh dokumen kerja sama (MoU, MoA/PKS) diupload ke laman LAPPKERMA?',
        type: 'conditional',
        condition_label: 'Status Upload',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'link_upload_lappkerma', label: 'Sertakan link upload ke laman LAPPKERMA', type: 'file_or_link' },
          { key: 'uraian_upload_lappkerma', label: 'Jelaskan proses upload dan status dokumen', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_upload_lappkerma', label: 'Jelaskan alasan tidak diupload', type: 'textarea' },
          { key: 'saran_perubahan_upload', label: 'Sampaikan saran perbaikan di masa depan', type: 'textarea' }
        ]
      }
    ]
  },
  F: {
    title: 'Kerja Sama Internasional',
    items: [
      {
        id: 'F1',
        title: 'Strategi dan Kebijakan Internasionalisasi',
        description: 'Ketersediaan kebijakan/strategi kerja sama internasional dalam dokumen perencanaan institusi.',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'arah_kebijakan', label: 'Uraikan arah kebijakan, target negara/mitra, dan prioritas program internasional', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'rencana_kebijakan_internasionalisasi', label: 'Uraikan rencana penyusunan kebijakan internasionalisasi', type: 'textarea' }
        ]
      },
      {
        id: 'F2',
        title: 'Implementasi Kerja Sama Internasional',
        description: 'Tingkat implementasi kerja sama internasional.',
        type: 'conditional',
        condition_label: 'Status Implementasi',
        condition_options: ['Telah berjalan', 'Belum berjalan'],
        fields_if_true: [
          { key: 'bentuk_kegiatan_internasional', label: 'Uraikan bentuk kegiatan (student exchange, joint research, double degree, visiting lecturer, dll)', type: 'textarea' },
          { key: 'capaian_internasional', label: 'Jelaskan capaian', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_implementasi_internasional', label: 'Uraikan kendala dan rencana pengembangan', type: 'textarea' }
        ]
      },
      {
        id: 'F3',
        title: 'Output dan Outcome Internasional',
        description: 'Capaian kerja sama internasional terhadap institusi.',
        type: 'conditional',
        condition_label: 'Status Capaian',
        condition_options: ['Ada capaian', 'Belum ada'],
        fields_if_true: [
          { key: 'uraian_capaian_internasional', label: 'Uraikan (publikasi internasional, mahasiswa asing, program bersama, dll)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_capaian_internasional', label: 'Uraikan kendala dan rencana perbaikan', type: 'textarea' }
        ]
      },
      {
        id: 'F4',
        title: 'Dukungan Sistem dan Regulasi',
        description: 'Ketersediaan dukungan sistem (SOP, panduan, regulasi) untuk kerja sama internasional.',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'jenis_implementasi_sistem', label: 'Uraikan jenis dan implementasinya', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'rencana_penyusunan_sistem', label: 'Uraikan rencana penyusunan', type: 'textarea' }
        ]
      }
    ]
  },
  G: {
    title: 'Komitmen Pembentukan International Office (IO)',
    items: [
      {
        id: 'G1',
        title: 'Kebijakan dan Komitmen Pimpinan',
        description: 'Komitmen pimpinan perguruan tinggi dalam pembentukan International Office (IO).',
        type: 'conditional',
        condition_label: 'Status Komitmen',
        condition_options: ['Telah ada komitmen', 'Belum'],
        fields_if_true: [
          { key: 'bentuk_komitmen', label: 'Uraikan bentuk komitmen (SK, kebijakan, roadmap, dll)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'rencana_pembentukan_io', label: 'Uraikan rencana pembentukan IO', type: 'textarea' }
        ]
      },
      {
        id: 'G2',
        title: 'Struktur Organisasi dan SDM',
        description: 'Ketersediaan struktur organisasi dan sumber daya manusia untuk International Office.',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'struktur_tugas_sdm', label: 'Uraikan struktur, tugas fungsi, dan kompetensi SDM', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'rencana_pembentukan_sdm', label: 'Uraikan rencana pembentukan dan penguatan SDM', type: 'textarea' }
        ]
      },
      {
        id: 'G3',
        title: 'Program Kerja International Office',
        description: 'Ketersediaan dan implementasi program kerja IO.',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'uraian_program_io', label: 'Uraikan program (layanan mahasiswa asing, promosi internasional, mobility program, dll)', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'rencana_pengembangan_program_io', label: 'Uraikan rencana pengembangan program', type: 'textarea' }
        ]
      },
      {
        id: 'G4',
        title: 'Dukungan Anggaran dan Fasilitas',
        description: 'Ketersediaan dukungan anggaran dan fasilitas untuk operasional IO.',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Tersedia', 'Belum tersedia'],
        fields_if_true: [
          { key: 'bentuk_dukungan_anggaran', label: 'Uraikan bentuk dukungan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'rencana_penganggaran_fasilitas', label: 'Uraikan rencana penganggaran dan penyediaan fasilitas', type: 'textarea' }
        ]
      }
    ]
  }
};

export const formSchema = formSchemaTimKerja;

export const formSchemaHumas: FormSchema = {
  I: {
    title: 'Unit Hubungan Masyarakat (HUMAS)',
    items: [
      {
        id: 'I1',
        title: 'Ketersediaan Unit HUMAS',
        description: 'Apakah pada Perguruan Tinggi Saudara terdapat Unit Hubungan Masyarakat (HUMAS)?',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'unit_humas_bawah', label: 'Unit Kerjasama tersebut berada di bawah?', type: 'radio', options: ['Unit Lain (Sebutkan Nama Unit)', 'Unit Hubungan Masyarakat'] },
          { key: 'nama_unit_lain', label: 'Jika Unit Lain, sebutkan nama unitnya', type: 'text' }
        ],
        fields_if_false: [
          { key: 'kendala_tidak_humas', label: 'Jika tidak, mengapa/apa kendalanya?', type: 'textarea' }
        ]
      },
      {
        id: 'I2',
        title: 'Penunjukkan Admin Humas',
        description: 'Apakah sudah ada penunjukkan admin Humas pada Perguruan Tinggi Saudara melalui Surat Keputusan (SK)?',
        type: 'conditional',
        condition_label: 'Status Penunjukkan',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'bukti_sk_humas', label: 'Lampirkan SK tersebut', type: 'file' }
        ],
        fields_if_false: [
          { key: 'kendala_sk_humas', label: 'Mohon disampaikan kendalanya', type: 'textarea' }
        ]
      },
      {
        id: 'I3',
        title: 'Media Publikasi',
        description: 'Media publikasi apa saja yang digunakan Perguruan Tinggi Saudara dalam melakukan publikasi informasi?',
        type: 'checkbox',
        label: 'Pilih media publikasi yang digunakan',
        options: ['Website PTS', 'Facebook', 'Instagram', 'Youtube', 'Twitter', 'Tiktok'],
        other_option: true,
        other_label: 'Media lainnya. Mohon disebutkan nama medianya'
      },
      {
        id: 'I4',
        title: 'Username Media Sosial',
        description: 'Mohon saudara sebutkan username media sosial yang saudara gunakan!',
        type: 'table',
        columns: ['Media Sosial', 'Username'],
        rows: [
          { id: 'row1', values: ['Instagram', ''] },
          { id: 'row2', values: ['Facebook', ''] },
          { id: 'row3', values: ['Youtube', ''] },
          { id: 'row4', values: ['Twitter', ''] },
          { id: 'row5', values: ['Tiktok', ''] },
          { id: 'row6', values: ['Lainnya', ''] }
        ]
      },
      {
        id: 'I5',
        title: 'Pengetahuan Staf Humas',
        description: 'Apakah staf Humas pada Perguruan Tinggi Saudara memiliki pengetahuan kehumasan yang memadai dan apakah publikasi informasi di sosial media berjalan dengan baik?',
        type: 'conditional',
        condition_label: 'Status Pengetahuan',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [],
        fields_if_false: [
          { key: 'kendala_pengetahuan_humas', label: 'Jika tidak, mengapa/apa kendalannya', type: 'textarea' }
        ]
      },
      {
        id: 'I6',
        title: 'Frekuensi Publikasi',
        description: 'Berapa kali dalam satu pekan admin humas di perguruan tinggi saudara melakukan publikasi informasi di sosial media?',
        type: 'radio',
        label: 'Pilih frekuensi publikasi',
        options: ['Lima kali dalam seminggu', 'Empat kali dalam seminggu', 'Tiga kali dalam seminggu', 'Dua kali dalam seminggu', 'Sekali dalam seminggu']
      }
    ]
  }
};

export const formSchemaLappkerma: FormSchema = {
  L: {
    title: 'Form Evaluasi Kerja Sama dan Upload LAPPKERMA',
    items: [
      {
        id: 'L1',
        title: 'Dokumen Perencanaan Strategis Kerja Sama',
        description: 'Apakah ada dokumen perencanaan strategis/Rencana Kerja Tahunan kerja sama (Renstra/RKT bidang kerjasama)?',
        type: 'conditional',
        condition_label: 'Status Ketersediaan',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'tahapan_perumusan', label: 'Jelaskan tahapan perumusan dokumen perencanaan kerja sama', type: 'textarea' },
          { key: 'bukti_dokumen_renstra', label: 'Lampirkan bukti dokumen perencanaan kerja sama', type: 'file' }
        ],
        fields_if_false: [
          { key: 'rencana_penyusunan_renstra', label: 'Apakah dokumen perencanaan kerja sama akan dilakukan? Jelaskan.', type: 'textarea' }
        ]
      },
      {
        id: 'L2',
        title: 'Keselarasan dengan Visi dan Misi',
        description: 'Apakah dokumen kerja sama selaras dengan visi dan misi perguruan tinggi?',
        type: 'conditional',
        condition_label: 'Status Keselarasan',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_keselarasan', label: 'Jelaskan bentuk keselarasan', type: 'textarea' },
          { key: 'contoh_keselarasan', label: 'Sebutkan contoh keselarasan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_selaras', label: 'Sebutkan alasan dan saran perubahan di masa depan', type: 'textarea' },
          { key: 'bukti_keselarasan', label: 'Lampirkan bukti pendukung', type: 'file' }
        ]
      },
      {
        id: 'L3',
        title: 'Keterlibatan Penyelenggara/Yayasan',
        description: 'Apakah penyelenggara/yayasan terlibat dalam perencanaan kerja sama perguruan tinggi?',
        type: 'conditional',
        condition_label: 'Status Keterlibatan',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_keterlibatan', label: 'Jelaskan bagaimana keterlibatan penyelenggara/yayasan', type: 'textarea' },
          { key: 'bukti_keterlibatan', label: 'Lampirkan bukti keterlibatan (FGD, workshop, dll)', type: 'file' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_terlibat', label: 'Sebutkan alasan dan saran perubahan di masa depan', type: 'textarea' }
        ]
      },
      {
        id: 'L4',
        title: 'Status Dokumen Kerja Sama',
        description: 'Jumlah dokumen MoU dan PKS aktif dan tidak aktif.',
        type: 'simple',
        fields: [
          { key: 'jumlah_mou_pks_aktif', label: 'Jumlah dokumen aktif (di dalam dan di luar negeri)', type: 'number' },
          { key: 'jumlah_mou_pks_tidak_aktif', label: 'Jumlah dokumen tidak aktif/kedaluwarsa', type: 'number' },
          { key: 'bukti_status_dokumen', label: 'Lampirkan bukti laporan kegiatan atau link kerjasama', type: 'file_or_link' }
        ]
      },
      {
        id: 'L5',
        title: 'Realisasi Program dari MoU/PKS',
        description: 'Apakah program dari MoU/PKS terealisasi?',
        type: 'conditional',
        condition_label: 'Status Realisasi',
        condition_options: ['Terealisasi', 'Belum terealisasi'],
        fields_if_true: [
          { key: 'uraian_program_teralisasi', label: 'Jelaskan kerja sama yang telah terealisasi', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_realisasi', label: 'Jelaskan kendala yang menyebabkan belum terealisasi', type: 'textarea' }
        ]
      },
      {
        id: 'L6',
        title: 'Kejelasan Peran dan Tanggung Jawab',
        description: 'Apakah pembagian peran dan tanggung jawab dalam implementasi kerja sama jelas?',
        type: 'conditional',
        condition_label: 'Status Kejelasan',
        condition_options: ['Jelas', 'Belum jelas'],
        fields_if_true: [
          { key: 'uraian_pembagian_peran', label: 'Jelaskan kejelasan pembagian peran dan tanggung jawab', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_pembagian_peran', label: 'Jelaskan kendala dan saran perbaikan di masa depan', type: 'textarea' }
        ]
      },
      {
        id: 'L7',
        title: 'Dampak terhadap Tridharma',
        description: 'Apakah kerja sama memberikan dampak terhadap peningkatan kualitas tridharma perguruan tinggi?',
        type: 'conditional',
        condition_label: 'Status Dampak',
        condition_options: ['Ada', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_dampak_tridharma', label: 'Jelaskan dampak terhadap pendidikan, penelitian, dan pengabdian', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_dampak_tridharma', label: 'Sebutkan kendala dan saran perubahan di masa depan', type: 'textarea' },
          { key: 'bukti_dampak_tridharma', label: 'Lampirkan bukti kegiatan atau laporan', type: 'file' }
        ]
      },
      {
        id: 'L8',
        title: 'Peningkatan Reputasi dan Jejaring',
        description: 'Apakah terjadi peningkatan reputasi dan jejaring institusi melalui kerja sama?',
        type: 'conditional',
        condition_label: 'Status Reputasi',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_reputasi_jejaring', label: 'Jelaskan peningkatan reputasi dan jejaring', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_reputasi_jejaring', label: 'Sebutkan kendala dan saran perubahan di masa depan', type: 'textarea' },
          { key: 'bukti_reputasi_jejaring', label: 'Lampirkan bukti publikasi, media, atau ranking', type: 'file' }
        ]
      },
      {
        id: 'L9',
        title: 'Manfaat Nyata bagi Mahasiswa/Dosen/PT',
        description: 'Apakah ada manfaat nyata yang dirasakan oleh mahasiswa, dosen, atau institusi?',
        type: 'conditional',
        condition_label: 'Status Manfaat',
        condition_options: ['Ada', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_manfaat', label: 'Jelaskan manfaat nyata yang dirasakan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'kendala_manfaat', label: 'Sebutkan kendala dan saran perubahan di masa depan', type: 'textarea' },
          { key: 'bukti_manfaat', label: 'Lampirkan bukti kuesioner, wawancara, atau testimoni', type: 'file' }
        ]
      },
      {
        id: 'L10',
        title: 'Mekanisme Monitoring dan Evaluasi',
        description: 'Apakah ada mekanisme monitoring dan evaluasi secara berkala terhadap kerja sama?',
        type: 'conditional',
        condition_label: 'Status Monev',
        condition_options: ['Ada', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_monev', label: 'Jelaskan mekanisme, frekuensi, dan instrumen monitoring/evaluasi', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_monev', label: 'Sebutkan alasan dan saran perubahan di masa depan', type: 'textarea' },
          { key: 'bukti_monev', label: 'Lampirkan bukti laporan monev atau rapat evaluasi', type: 'file' }
        ]
      },
      {
        id: 'L11',
        title: 'Tindak Lanjut Hasil Evaluasi',
        description: 'Apakah ada tindak lanjut dari hasil evaluasi dan perbaikan program kerja sama?',
        type: 'conditional',
        condition_label: 'Status Tindak Lanjut',
        condition_options: ['Ada', 'Tidak'],
        fields_if_true: [
          { key: 'uraian_tindak_lanjut', label: 'Jelaskan tindak lanjut dan perbaikan', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_tindak_lanjut', label: 'Sebutkan alasan/kendala dan saran perubahan di masa depan', type: 'textarea' },
          { key: 'bukti_tindak_lanjut', label: 'Lampirkan bukti pelaksanaan rekomendasi', type: 'file' }
        ]
      },
      {
        id: 'L12',
        title: 'Kelengkapan Dokumen Administratif',
        description: 'Apakah ada kelengkapan dokumen legal dan administratif kerja sama?',
        type: 'conditional',
        condition_label: 'Status Kelengkapan',
        condition_options: ['Lengkap', 'Belum lengkap'],
        fields_if_true: [
          { key: 'rincian_dokumen_kerjasama', label: 'Sebutkan/rincikan dokumen yang lengkap', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_lengkap_dokumen', label: 'Sebutkan alasannya dan saran perbaikan di masa depan', type: 'textarea' }
        ]
      },
      {
        id: 'L13',
        title: 'Upload Dokumen ke LAPPKERMA',
        description: 'Apakah seluruh dokumen kerja sama (MoU, MoA/PKS) diupload ke laman LAPPKERMA?',
        type: 'conditional',
        condition_label: 'Status Upload LAPPKERMA',
        condition_options: ['Ya', 'Tidak'],
        fields_if_true: [
          { key: 'link_upload_lappkerma', label: 'Link upload ke laman LAPPKERMA', type: 'file_or_link' },
          { key: 'uraian_upload_lappkerma', label: 'Jelaskan proses upload dan status dokumen', type: 'textarea' }
        ],
        fields_if_false: [
          { key: 'alasan_tidak_upload_lappkerma', label: 'Sebutkan alasannya dan saran perubahan di masa depan', type: 'textarea' }
        ]
      }
    ]
  }
};

export const sectionKeys = Object.keys(formSchema);
export const sectionKeysTimKerja = Object.keys(formSchemaTimKerja);
export const sectionKeysHumas = Object.keys(formSchemaHumas);
export const sectionKeysLappkerma = Object.keys(formSchemaLappkerma);

export function getFormSchema(formType?: string): FormSchema {
  if (formType === 'humas') return formSchemaHumas;
  if (formType === 'lappkerma') return formSchemaLappkerma;
  return formSchemaTimKerja;
}

export function getFormTypeLabel(formType?: string): string {
  if (formType === 'humas') return 'Hubungan Masyarakat (HUMAS)';
  if (formType === 'lappkerma') return 'Upload LAPPKERMA';
  return 'Tim Kerja Kerjasama';
}
