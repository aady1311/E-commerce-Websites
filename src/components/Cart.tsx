import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { ViewMode } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  setCurrentView: (view: ViewMode) => void;
}

export default function Cart({ isOpen, onClose, setCurrentView }: CartProps) {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    onClose();
    setCurrentView('checkout');
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-primary-950 shadow-2xl transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-primary-200 dark:border-primary-800">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-6 h-6 text-primary-900 dark:text-white" />
              <h2 className="text-2xl font-bold text-primary-900 dark:text-white">
                Shopping Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="w-6 h-6 text-primary-700 dark:text-primary-200" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="w-16 h-16 text-primary-300 dark:text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-primary-900 dark:text-white mb-2">
                  Your cart is empty
                </h3>
                <p className="text-primary-600 dark:text-primary-400 mb-6">
                  Looks like you haven't added anything yet
                </p>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentView('products');
                  }}
                  className="btn-primary"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div
                    key={`${item.product.id}-${item.size}-${item.color}`}
                    className="flex gap-4 p-4 bg-primary-50 dark:bg-primary-900 rounded-xl animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-primary-900 dark:text-white line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-xs text-primary-600 dark:text-primary-400 mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <p className="text-base font-bold text-primary-900 dark:text-white mt-2">
                        ${item.product.price}
                      </p>

                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                          className="p-1 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
                        >
                          <Minus className="w-4 h-4 text-primary-700 dark:text-primary-300" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-primary-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                          className="p-1 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
                        >
                          <Plus className="w-4 h-4 text-primary-700 dark:text-primary-300" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                          className="ml-auto p-1 rounded-lg hover:bg-error-100 dark:hover:bg-error-900/30 transition-colors duration-200 group"
                        >
                          <Trash2 className="w-4 h-4 text-error-500 group-hover:scale-110 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-primary-200 dark:border-primary-800 p-6 space-y-4 bg-primary-50 dark:bg-primary-900">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm text-primary-600 dark:text-primary-400">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-primary-600 dark:text-primary-400">
                  <span>Shipping</span>
                  <span>{cartTotal >= 100 ? 'Free' : '$9.99'}</span>
                </div>
                <div className="flex items-center justify-between text-lg font-bold text-primary-900 dark:text-white pt-2 border-t border-primary-200 dark:border-primary-700">
                  <span>Total</span>
                  <span>${(cartTotal >= 100 ? cartTotal : cartTotal + 9.99).toFixed(2)}</span>
                </div>
              </div>

              {cartTotal < 100 && (
                <div className="bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 text-sm p-3 rounded-lg">
                  Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                </div>
              )}

              <div className="space-y-3">
                <button
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center gap-2 btn-primary"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={clearCart}
                  className="w-full text-sm text-primary-600 dark:text-primary-400 hover:text-error-500 dark:hover:text-error-400 transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
