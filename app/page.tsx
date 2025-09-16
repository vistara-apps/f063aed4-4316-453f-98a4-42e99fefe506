'use client';

import { useState } from 'react';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = async () => {
    setIsLoading(true);
    try {
      // Placeholder for wallet connection
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Connection error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            FitFlow AI
          </h1>
          <p className="text-gray-600">
            Your AI-powered fitness companion
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleConnect}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          <p className="text-sm text-gray-500 text-center">
            Connect your wallet to start tracking your fitness journey
          </p>
        </div>
      </div>
    </div>
  );
}
