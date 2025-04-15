'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

export default function PremiumPage() {
  const { user } = useAuth();
  const { theme, colorScheme, setTheme, setColorScheme } = useTheme();
  const router = useRouter();

  const handleUpgrade = async () => {
    if (!user) return;
    
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        isPremium: true
      });
      router.push('/habits');
    } catch (error) {
      console.error('Error upgrading to premium:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {user?.isPremium ? (
          <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                Premium Features
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Theme Preferences</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Color Scheme
                      </label>
                      <select
                        value={colorScheme}
                        onChange={(e) => setColorScheme(e.target.value as any)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="indigo">Indigo</option>
                        <option value="emerald">Emerald</option>
                        <option value="rose">Rose</option>
                        <option value="amber">Amber</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Theme Mode
                      </label>
                      <select
                        value={theme}
                        onChange={(e) => setTheme(e.target.value as any)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="system">System</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Other Premium Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Unlimited habits tracking</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Detailed progress visualization</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3">Daily reminders</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              <h2 className="text-2xl font-bold text-center mb-8">
                Upgrade to Premium
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Daily reminders via email or browser</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Detailed progress visualization and statistics</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Track unlimited habits</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-3">Customizable themes and interface</span>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div className="text-4xl font-bold mb-4">$2.99<span className="text-lg text-gray-500">/month</span></div>
                <button
                  onClick={handleUpgrade}
                  className="w-full sm:w-auto inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}