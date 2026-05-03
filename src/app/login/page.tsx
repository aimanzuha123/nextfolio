import type { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: 'Login — Nextfolio',
  description: 'Sign in or create your Nextfolio account to start building your portfolio.',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen page-gradient flex items-center justify-center relative overflow-hidden px-4 py-16">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-[100px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/6 blur-[80px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Auth Form */}
      <div className="relative z-10 w-full">
        <AuthForm />
      </div>
    </div>
  );
}
