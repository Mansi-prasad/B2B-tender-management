import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
        <main className="p-6">
          <Toaster/>
          {children}</main>
      </body>
    </html>
  );
}
