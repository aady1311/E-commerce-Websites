import { ArrowRight, TrendingUp } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product, ViewMode } from '../types';

interface TrendingProductsProps {
  setCurrentView: (view: ViewMode) => void;
  onViewDetails?: (product: Product) => void;
}

export default function TrendingProducts({ setCurrentView, onViewDetails }: TrendingProductsProps) {
  const trendingProducts = products.slice(0, 8);

  return (
    <section className="py-20 bg-primary-50 dark:bg-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-semibold text-accent-500 uppercase tracking-wider">
                Trending Now
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-primary-900 dark:text-white">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('products')}
            className="group flex items-center gap-2 text-primary-900 dark:text-white font-semibold hover:text-accent-600 dark:hover:text-accent-400 transition-colors duration-200"
          >
            View All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} onViewDetails={onViewDetails} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
