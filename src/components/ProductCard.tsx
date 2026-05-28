import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

const COLOR_MAP: Record<string, string> = {
  // Neutrals
  black: '#1a1a1a', white: '#f5f5f5', ivory: '#fffff0', cream: '#fffdd0',
  beige: '#f5f0e8', grey: '#9e9e9e', 'heather grey': '#b0b0b0', charcoal: '#36454f',
  // Browns
  brown: '#795548', tan: '#d2b48c', camel: '#c19a6b', cognac: '#9b4722',
  taupe: '#b5a49a', 'dark brown': '#4e342e',
  // Blues
  navy: '#1a237e', blue: '#1565c0', indigo: '#3949ab', 'midnight blue': '#191970',
  'light blue': '#90caf9', 'light wash': '#a8c4d4', 'blue/white': '#5b8dd9',
  // Reds & Pinks
  red: '#c62828', burgundy: '#6d1b2e', 'dusty rose': '#d4a0a0', pink: '#f48fb1',
  blush: '#f7c5c5', 'soft pink': '#f9a8c9', 'pink floral': '#e91e8c',
  'red/white': '#e53935',
  // Greens
  green: '#2e7d32', olive: '#808000', sage: '#8fbc8f', 'sage green': '#8fbc8f',
  forest: '#228b22', 'forest green': '#228b22', 'green/white': '#43a047',
  'green floral': '#388e3c',
  // Yellows & Oranges
  gold: '#ffd700', 'rose gold': '#b76e79',
  // Purples
  lavender: '#e6e0f8', purple: '#7b1fa2',
  // Whites & Lights
  silver: '#c0c0c0', 'blue floral': '#1e88e5',
  // Combos (use first color)
  'silver/black': '#c0c0c0', 'gold/brown': '#ffd700', 'rose gold/navy': '#b76e79',
  'tortoise': '#8b5e3c', clear: '#e0e0e0',
};

function colorToHex(name: string): string {
  return COLOR_MAP[name.toLowerCase()] ?? '#a0a0a0';
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addToCart, addToWishlist, isInWishlist } = useCart();
  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleQuickAdd = () => {
    addToCart(product, product.sizes[0], product.colors[0]);
  };

  return (
    <div className="group relative bg-white dark:bg-primary-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />

        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="px-3 py-1 text-xs font-semibold bg-primary-900 text-white rounded-full shadow-lg">
              New
            </span>
          )}
          {product.isTrending && (
            <span className="px-3 py-1 text-xs font-semibold bg-accent-500 text-white rounded-full shadow-lg">
              Trending
            </span>
          )}
          {discount > 0 && (
            <span className="px-3 py-1 text-xs font-semibold bg-success-500 text-white rounded-full shadow-lg">
              -{discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => addToWishlist(product)}
          className={`absolute top-4 right-4 p-2.5 rounded-full shadow-lg transition-all duration-300 ${
            inWishlist
              ? 'bg-error-500 text-white'
              : 'bg-white/90 dark:bg-primary-800/90 text-primary-700 dark:text-primary-200 hover:bg-error-50 dark:hover:bg-error-900/50 hover:text-error-500'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-primary-800 text-primary-900 dark:text-white font-semibold py-3 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-200 shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(product)}
              className="p-3 bg-white dark:bg-primary-800 text-primary-900 dark:text-white rounded-lg hover:bg-primary-50 dark:hover:bg-primary-700 transition-colors duration-200 shadow-lg"
              aria-label="Quick view"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-5">
        <p className="text-xs font-medium text-primary-500 dark:text-primary-400 uppercase tracking-wider mb-2">
          {product.category}'s
        </p>

        <h3 className="text-lg font-semibold text-primary-900 dark:text-white mb-2 line-clamp-1 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors duration-200">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-warning-400 fill-current'
                    : 'text-primary-300 dark:text-primary-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-primary-600 dark:text-primary-400">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary-900 dark:text-white">
            ${product.price}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-primary-500 dark:text-primary-400 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mt-3">
          <div className="flex -space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-6 h-6 rounded-full border-2 border-white dark:border-primary-700 flex-shrink-0"
                style={{ backgroundColor: colorToHex(color) }}
                title={color}
              />
            ))}
          </div>
          {product.colors.length > 3 && (
            <span className="text-xs text-primary-600 dark:text-primary-400">
              +{product.colors.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
