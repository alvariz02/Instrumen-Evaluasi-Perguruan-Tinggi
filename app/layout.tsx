import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientToaster from '@/components/ClientToaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Instrumen Tim Kerja Kerjasama Perguruan Tinggi',
  description: 'Formulir instrumen kerja sama perguruan tinggi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}
