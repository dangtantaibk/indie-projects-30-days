'use client';

import { useState } from 'react';
import { SignIn } from '@/components/auth/SignIn';
import { SignUp } from '@/components/auth/SignUp';

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pt-12">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                isSignIn
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsSignIn(true)}
            >
              Sign In
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                !isSignIn
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setIsSignIn(false)}
            >
              Sign Up
            </button>
          </div>
        </div>
        {isSignIn ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );