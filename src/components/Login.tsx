import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { ViewMode } from '../types';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  setCurrentView: (view: ViewMode) => void;
}

export default function Login({ setCurrentView }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = login(email, password);
    setIsLoading(false);
    if (result.success) {
      setCurrentView('home');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-800 flex items-center justify-center pt-20 pb-12 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-200/30 dark:bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary-200/40 dark:bg-primary-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative w-full max-w-md">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>

        <div className="bg-white dark:bg-primary-900 rounded-3xl shadow-2xl p-8 animate-scale-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-900 dark:bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white dark:text-primary-900 font-bold text-2xl">L</span>
            </div>
            <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-primary-600 dark:text-primary-400">Sign in to access your account</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 dark:text-primary-600" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 dark:text-primary-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-12 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-400 dark:text-primary-600 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary-200 dark:border-primary-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-primary-900 text-primary-500 dark:text-primary-400">
                New to LUXE?
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('signup')}
            className="w-full flex items-center justify-center gap-2 bg-primary-50 dark:bg-primary-800 hover:bg-primary-100 dark:hover:bg-primary-700 text-primary-900 dark:text-white font-semibold py-3 rounded-lg border border-primary-200 dark:border-primary-700 transition-all duration-200"
          >
            <UserPlus className="w-5 h-5" />
            <span>Create an Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
