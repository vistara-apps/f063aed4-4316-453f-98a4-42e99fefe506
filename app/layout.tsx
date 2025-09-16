import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'FitFlow AI - Your AI-powered fitness companion',
  description: 'Track your fitness habits with AI coaching and visualize your progress effortlessly.',
  keywords: ['fitness', 'AI', 'tracking', 'workout', 'health', 'Base', 'MiniApp'],
  authors: [{ name: 'FitFlow AI Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: 'hsl(210, 70%, 50%)',
  openGraph: {
    title: 'FitFlow AI',
    description: 'Your AI-powered fitness companion for effortless tracking and personalized progress.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitFlow AI',
    description: 'Your AI-powered fitness companion for effortless tracking and personalized progress.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-text-primary">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
