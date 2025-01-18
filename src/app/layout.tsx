import { createTheme, MantineProvider } from '@mantine/core'; // Import MantineProvider
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AuthProvider } from '../context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'San Diego Custom Backyards & Landscaping',
  description: 'Exceptional backyard transformations and landscaping services in San Diego, California.',
};




export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}>
        <AuthProvider>
          <MantineProvider defaultColorScheme="light"> {/* MantineProvider Added */}
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </MantineProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
