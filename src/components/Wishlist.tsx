import { ArrowLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';
import { ViewMode } from '../types';

interface WishlistProps {
  setCurrentView: (view: ViewMode) => void;
}

export default function Wishlist({ setCurrentView }: WishlistProps) {
  const { wishlistItems, addToCart, removeFromWishlist } = useCart();

  const handleAddAllToCart = () => {
    wishlistItems.forEach((product) => {
      addToCart(product, product.sizes[0], product.colors[0]);
    });
    setCurrentView('cart');
  };

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors duration-200 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shopping</span>
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-error-500 fill-current" />
              <h1 className="text-3xl sm:text-4xl font-bold text-primary-900 dark:text-white">
                My Wishlist
              </h1>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={handleAddAllToCart}
                className="flex items-center gap-2 bg-primary-900 hover:bg-primary-800 dark:bg-white dark:hover:bg-primary-50 text-white dark:text-primary-900 font-semibold px-6 py-3 rounded-lg transition-all duration-200"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Add All to Cart</span>
              </button>
            )}
          </div>
          {wishlistItems.length > 0 && (
            <p className="text-primary-600 dark:text-primary-400 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-primary-100 dark:bg-primary-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-primary-400 dark:text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-primary-900 dark:text-white mb-3">
              Your wishlist is empty
            </h2>
            <p className="text-primary-600 dark:text-primary-400 mb-8 max-w-md mx-auto">
              Save your favorite items here to view them later or add them to your cart
            </p>
            <button
              onClick={() => setCurrentView('products')}
              className="btn-primary"
            >
              Explore Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product, index) => (
              <div
                key={product.id}
                className="relative animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={product} onViewDetails={() => {}} />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-error-500 hover:bg-error-600 text-white rounded-lg shadow-lg transition-all duration-200 hover:scale-110 z-10"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
