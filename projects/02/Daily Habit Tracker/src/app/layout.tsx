import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";
import { Navbar } from "@/components/ui/Navbar";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { ConnectionStatus } from "@/components/ui/ConnectionStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Daily Habit Tracker",
  description: "Track and maintain your daily habits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-200`}>
        <AuthProvider>
          <ThemeProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                <Navbar />
                {children}
                <ConnectionStatus />
              </div>
            </ErrorBoundary>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
