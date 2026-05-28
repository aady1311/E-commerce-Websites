import { useState } from 'react';
import { ArrowLeft, CheckCircle, CreditCard, MapPin, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ViewMode } from '../types';

interface CheckoutProps {
  setCurrentView: (view: ViewMode) => void;
}

export default function Checkout({ setCurrentView }: CheckoutProps) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isPlacing, setIsPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId] = useState(() => 'ORD-' + Math.random().toString(36).substring(2, 8).toUpperCase());

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: '',
  });

  const shipping = cartTotal >= 100 ? 0 : 9.99;
  const total = cartTotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacing(true);
    await new Promise((r) => setTimeout(r, 1200));

    // Save order to localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({
      id: orderId,
      items: cartItems,
      total,
      date: new Date().toISOString(),
      address: `${form.address}, ${form.city} ${form.zip}`,
      userId: user?.id || 'guest',
    });
    localStorage.setItem('orders', JSON.stringify(orders));

    clearCart();
    setIsPlacing(false);
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-800 flex items-center justify-center pt-20 pb-12 px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-14 h-14 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-3">Order Placed!</h1>
          <p className="text-primary-600 dark:text-primary-400 mb-2">
            Thank you{user ? `, ${user.name.split(' ')[0]}` : ''}! Your order has been confirmed.
          </p>
          <p className="text-sm font-mono bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-lg inline-block mb-8">
            {orderId}
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => setCurrentView('products')} className="btn-primary">
              Continue Shopping
            </button>
            <button
              onClick={() => setCurrentView('home')}
              className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    setCurrentView('products');
    return null;
  }

  return (
    <div className="min-h-screen bg-primary-50 dark:bg-primary-950 pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <h1 className="text-3xl font-bold text-primary-900 dark:text-white mb-8">Checkout</h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Forms */}
          <div className="space-y-6">
            {/* Shipping */}
            <div className="bg-white dark:bg-primary-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                <h2 className="text-lg font-semibold text-primary-900 dark:text-white">Shipping Address</h2>
              </div>
              <div className="space-y-3">
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Full Name" className="input-field" />
                <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="Email" className="input-field" />
                <input name="address" value={form.address} onChange={handleChange} required placeholder="Street Address" className="input-field" />
                <div className="grid grid-cols-2 gap-3">
                  <input name="city" value={form.city} onChange={handleChange} required placeholder="City" className="input-field" />
                  <input name="zip" value={form.zip} onChange={handleChange} required placeholder="ZIP Code" className="input-field" />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white dark:bg-primary-900 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                <h2 className="text-lg font-semibold text-primary-900 dark:text-white">Payment</h2>
              </div>
              <div className="space-y-3">
                <input
                  name="card"
                  value={form.card}
                  onChange={handleChange}
                  required
                  placeholder="Card Number (e.g. 4242 4242 4242 4242)"
                  className="input-field"
                  maxLength={19}
                />
                <div className="grid grid-cols-2 gap-3">
                  <input name="expiry" value={form.expiry} onChange={handleChange} required placeholder="MM/YY" className="input-field" maxLength={5} />
                  <input name="cvv" value={form.cvv} onChange={handleChange} required placeholder="CVV" className="input-field" maxLength={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="bg-white dark:bg-primary-900 rounded-2xl p-6 shadow-sm sticky top-24">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary-700 dark:text-primary-300" />
                <h2 className="text-lg font-semibold text-primary-900 dark:text-white">Order Summary</h2>
              </div>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 items-center">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-primary-900 dark:text-white line-clamp-1">{item.product.name}</p>
                      <p className="text-xs text-primary-500 dark:text-primary-400">{item.size} · {item.color} · ×{item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary-900 dark:text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-primary-200 dark:border-primary-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-primary-600 dark:text-primary-400">
                  <span>Subtotal</span><span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-primary-600 dark:text-primary-400">
                  <span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-900 dark:text-white pt-2 border-t border-primary-200 dark:border-primary-700">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPlacing}
                className="w-full btn-primary mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlacing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <span>Place Order · ${total.toFixed(2)}</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
