import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Finance Ops Dashboard',
  description: 'Unified finance intelligence for Xavier',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
