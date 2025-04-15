'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/config/firebase';

type User = {
  uid: string;
  email: string | null;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: false });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}