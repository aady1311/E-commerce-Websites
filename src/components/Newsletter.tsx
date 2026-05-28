import { useState } from 'react';
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribed(true);
    setIsLoading(false);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-accent-500 via-accent-600 to-accent-700 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Join the LUXE Family</h2>
          <p className="text-xl text-white/90 mb-8">Subscribe for exclusive offers and early access to new collections</p>
          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email address" className="w-full pl-14 pr-5 py-4 rounded-full text-primary-900 placeholder-primary-400 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg" required />
              </div>
              <button type="submit" disabled={isLoading} className="flex items-center justify-center gap-2 bg-primary-900 hover:bg-primary-800 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 disabled:opacity-50">
                {isLoading ? (<><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Subscribing...</span></>) : (<><span>Subscribe</span><ArrowRight className="w-5 h-5" /></>)}
              </button>
            </form>
          ) : (
            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-xl mx-auto">
              <div className="flex items-center justify-center w-16 h-16 bg-success-500 rounded-full mx-auto mb-4"><Check className="w-8 h-8 text-white" /></div>
              <h3 className="text-2xl font-bold text-white mb-2">You are In!</h3>
              <p className="text-white/90">Thanks for subscribing. Check your inbox for a welcome gift!</p>
            </div>
          )}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm">
            <span className="flex items-center gap-2"><Check className="w-4 h-4" />10% off first order</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" />Early access</span>
            <span className="hidden sm:inline">|</span>
            <span className="flex items-center gap-2"><Check className="w-4 h-4" />Exclusive offers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
