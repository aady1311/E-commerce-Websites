import { ArrowRight, Sparkles } from 'lucide-react';
import { ViewMode } from '../types';

interface HeroProps {
  setCurrentView: (view: ViewMode) => void;
}

export default function Hero({ setCurrentView }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-800">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-accent-200/30 dark:bg-accent-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-primary-200/40 dark:bg-primary-700/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-accent-100/20 dark:bg-accent-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="h-full w-full" style={{
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm border border-primary-100 dark:border-primary-700">
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                New Collection 2026
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-primary-900 dark:text-white mb-6">
              Redefine Your
              <span className="block mt-2 bg-gradient-to-r from-primary-900 via-primary-700 to-primary-600 dark:from-white dark:via-primary-100 dark:to-primary-200 bg-clip-text text-transparent">
                Style Statement
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-primary-600 dark:text-primary-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover premium fashion that combines timeless elegance with modern sophistication.
              Crafted for those who appreciate exceptional quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => setCurrentView('products')}
                className="group inline-flex items-center justify-center gap-2 bg-primary-900 hover:bg-primary-800 dark:bg-white dark:hover:bg-primary-50 text-white dark:text-primary-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
              >
                Shop Collection
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              <button
                onClick={() => setCurrentView('products')}
                className="inline-flex items-center justify-center bg-white/80 dark:bg-primary-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-primary-800 text-primary-900 dark:text-white font-semibold px-8 py-4 rounded-lg border border-primary-200 dark:border-primary-600 transition-all duration-300 hover:shadow-lg"
              >
                Explore New Arrivals
              </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { value: '500+', label: 'Products' },
                { value: '50k+', label: 'Happy Customers' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-3xl sm:text-4xl font-bold text-primary-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <img
                src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fashion Model"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-primary-900 rounded-2xl shadow-xl p-6 max-w-xs animate-scale-in">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-primary-900 dark:text-white">Premium Coat</p>
                  <p className="text-primary-600 dark:text-primary-400">$495</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-accent-500 text-white rounded-2xl shadow-lg px-4 py-2">
              <span className="text-sm font-semibold">New Arrival</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full text-white dark:text-primary-900">
          <path d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,48C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" fill="currentColor"/>
        </svg>
      </div>
    </section>
  );
}
