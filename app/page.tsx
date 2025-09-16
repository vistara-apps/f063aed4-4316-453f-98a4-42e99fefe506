'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MiniKit } from '@coinbase/minikit';
import { loadFromLocalStorage } from '@/lib/utils';
import { User } from '@/lib/types';

export default function HomePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // Check if user is connected to MiniKit
        const isConnected = MiniKit.isInstalled();

        if (!isConnected) {
          // Redirect to onboarding if not connected
          router.push('/onboarding');
          return;
        }

        // Check if user has completed onboarding
        const userData = loadFromLocalStorage<User>('fitflow_user', null);

        if (!userData) {
          // User is connected but hasn't completed onboarding
          router.push('/onboarding');
        } else {
          // User is fully set up, go to dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        router.push('/onboarding');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading FitFlow AI...</p>
        </div>
      </div>
    );
  }

  return null;
}

