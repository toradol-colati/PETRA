import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-serif' });

export const metadata: Metadata = {
  title: 'PETRA',
  description: 'Infrastruttura per la conservazione del patrimonio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#F5F0EB] text-[#1A1A1A] antialiased font-sans">
        {children}
      </body>
    </html>
  );
}