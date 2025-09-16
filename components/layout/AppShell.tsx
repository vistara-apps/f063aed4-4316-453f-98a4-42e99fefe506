import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
    { name: 'Log Workout', href: '/workout', icon: '💪' },
    { name: 'Progress', href: '/progress', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-gray-200 px-4 py-4">
        <div className="max-w-screen-sm mx-auto">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="text-xl font-bold text-primary">FitFlow AI</span>
            </Link>
            <nav className="flex space-x-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    pathname === item.href
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-gray-100'
                  )}
                >
                  <span className="mr-1">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-sm mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-surface border-t border-gray-200 px-4 py-4 mt-12">
        <div className="max-w-screen-sm mx-auto text-center">
          <p className="text-sm text-text-secondary">
            © 2024 FitFlow AI. Powered by Base and Farcaster.
          </p>
        </div>
      </footer>
    </div>
  );
}

