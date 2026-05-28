import { useState } from 'react';
import { X, Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RefreshCw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToWishlist, isInWishlist } = useCart();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    addToCart(product, selectedSize, selectedColor);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300" onClick={onClose} />
      <div className="fixed inset-4 md:inset-10 lg:inset-20 z-50 bg-white dark:bg-primary-900 rounded-3xl shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-3 bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 rounded-full transition-colors duration-200" aria-label="Close">
          <X className="w-6 h-6 text-primary-700 dark:text-primary-200" />
        </button>
        <div className="h-full overflow-y-auto">
          <div className="grid lg:grid-cols-2 h-full">
            <div className="relative bg-primary-50 dark:bg-primary-800 p-8 lg:p-12">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                {product.isNew && <span className="px-4 py-2 text-sm font-bold bg-primary-900 text-white rounded-full shadow-lg">New Arrival</span>}
                {discount > 0 && <span className="px-4 py-2 text-sm font-bold bg-error-500 text-white rounded-full shadow-lg">-{discount}% OFF</span>}
              </div>
            </div>
            <div className="p-8 lg:p-12 overflow-y-auto">
              <p className="text-sm font-bold text-accent-500 uppercase tracking-wider mb-3">{product.category}'s Collection</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary-900 dark:text-white mb-4">{product.name}</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-warning-400 fill-current' : 'text-primary-300 dark:text-primary-600'}`} />
                  ))}
                </div>
                <span className="text-primary-600 dark:text-primary-400">{product.rating} ({product.reviews} reviews)</span>
              </div>
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl font-bold text-primary-900 dark:text-white">${product.price}</span>
                {product.originalPrice && <span className="text-xl text-primary-400 line-through">${product.originalPrice}</span>}
              </div>
              <p className="text-primary-600 dark:text-primary-400 mb-8 leading-relaxed">{product.description}</p>
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-primary-900 dark:text-white mb-3">Color: <span className="text-primary-600 dark:text-primary-400">{selectedColor || 'Select'}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button key={color} onClick={() => setSelectedColor(color)} className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200 ${selectedColor === color ? 'border-primary-900 dark:border-white bg-primary-50 dark:bg-primary-800 text-primary-900 dark:text-white' : 'border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:border-primary-400'}`}>
                      {color}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-primary-900 dark:text-white mb-3">Size: <span className="text-primary-600 dark:text-primary-400">{selectedSize || 'Select'}</span></h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 rounded-lg border-2 font-semibold transition-all duration-200 ${selectedSize === size ? 'border-primary-900 dark:border-white bg-primary-900 dark:bg-white text-white dark:text-primary-900' : 'border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:border-primary-400'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-primary-900 dark:text-white mb-3">Quantity</h3>
                <div className="flex items-center gap-4">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors duration-200"><Minus className="w-5 h-5 text-primary-700 dark:text-primary-200" /></button>
                  <span className="text-2xl font-bold text-primary-900 dark:text-white w-16 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="p-2 rounded-lg bg-primary-100 dark:bg-primary-800 hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors duration-200"><Plus className="w-5 h-5 text-primary-700 dark:text-primary-200" /></button>
                </div>
              </div>
              <div className="flex gap-4 mb-8">
                <button onClick={handleAddToCart} className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg transition-all duration-300 bg-primary-900 hover:bg-primary-800 dark:bg-white dark:hover:bg-primary-50 text-white dark:text-primary-900">
                  <ShoppingBag className="w-5 h-5" /><span>Add to Cart</span>
                </button>
                <button onClick={() => addToWishlist(product)} className={`p-4 rounded-xl border-2 transition-all duration-200 ${inWishlist ? 'bg-error-50 dark:bg-error-900/30 border-error-500 text-error-500' : 'border-primary-200 dark:border-primary-700 text-primary-700 dark:text-primary-300 hover:border-error-500 hover:text-error-500'}`}>
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="space-y-4 pt-6 border-t border-primary-200 dark:border-primary-700">
                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400"><Truck className="w-5 h-5 text-accent-500" /><span>Free shipping on orders over $100</span></div>
                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400"><Shield className="w-5 h-5 text-accent-500" /><span>Secure payment guaranteed</span></div>
                <div className="flex items-center gap-3 text-primary-600 dark:text-primary-400"><RefreshCw className="w-5 h-5 text-accent-500" /><span>30-day easy returns</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
