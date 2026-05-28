import { useState } from 'react';
import { ArrowLeft, Grid, List, ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';
import { Product, Category, ViewMode } from '../types';

interface ProductListingProps {
  setCurrentView: (view: ViewMode) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductListing({ setCurrentView, onViewDetails }: ProductListingProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'newest'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories: (Category | 'all')[] = ['all', 'men', 'women', 'kids', 'accessories'];

  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'newest': return a.isNew ? -1 : 1;
      default: return a.isTrending ? -1 : 1;
    }
  });

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button onClick={() => setCurrentView('home')} className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors duration-200 mb-4">
            <ArrowLeft className="w-5 h-5" /><span>Back to Home</span>
          </button>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 dark:text-white">All Products</h1>
              <p className="text-primary-600 dark:text-primary-400 mt-1">{sortedProducts.length} products</p>
            </div>
          </div>
        </div>
        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-primary-900 rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-primary-900 dark:text-white mb-6">Filters</h3>
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-primary-900 dark:text-white mb-3">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button key={cat} onClick={() => setSelectedCategory(cat)} className={`block w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-200 ${selectedCategory === cat ? 'bg-primary-900 dark:bg-white text-white dark:text-primary-900' : 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-800'}`}>
                      {cat === 'all' ? 'All Products' : `${cat.charAt(0).toUpperCase() + cat.slice(1)}'s`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="bg-white dark:bg-primary-900 rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Sort:</span>
                <div className="relative">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="appearance-none bg-primary-50 dark:bg-primary-800 border border-primary-200 dark:border-primary-700 rounded-lg px-4 py-2 pr-8 text-primary-900 dark:text-white font-medium focus:ring-2 focus:ring-accent-500 cursor-pointer">
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-500 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid' ? 'bg-primary-900 dark:bg-white text-white dark:text-primary-900' : 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400'}`}><Grid className="w-5 h-5" /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list' ? 'bg-primary-900 dark:bg-white text-white dark:text-primary-900' : 'bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-400'}`}><List className="w-5 h-5" /></button>
              </div>
            </div>
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20"><p className="text-xl text-primary-600 dark:text-primary-400 mb-4">No products found</p></div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {sortedProducts.map((product, index) => (
                  <div key={product.id} style={{ animationDelay: `${index * 50}ms` }}>
                    <ProductCard product={product} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
