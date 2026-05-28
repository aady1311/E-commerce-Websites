import { ArrowRight } from 'lucide-react';
import { categories } from '../data/products';
import { ViewMode } from '../types';

interface CategoriesProps {
  setCurrentView: (view: ViewMode) => void;
}

export default function Categories({ setCurrentView }: CategoriesProps) {
  return (
    <section className="py-20 bg-white dark:bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-primary-600 dark:text-primary-400 max-w-2xl mx-auto">
            Explore our curated collections designed for every aspect of your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <button
              key={category.slug}
              onClick={() => setCurrentView('products')}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/5] relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500" />

                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1 transform group-hover:translate-x-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-3">
                    {category.count} Products
                  </p>
                  <div className="flex items-center text-white font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-700 dark:to-primary-800 p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Free Shipping on Orders $100+
              </h3>
              <p className="text-primary-200 text-lg">
                Elevate your style with free worldwide delivery
              </p>
            </div>
            <button
              onClick={() => setCurrentView('products')}
              className="group flex items-center gap-2 bg-white hover:bg-primary-50 text-primary-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              Shop Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
