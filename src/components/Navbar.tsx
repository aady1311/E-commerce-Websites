import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Heart, Search, Sun, Moon, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ViewMode } from '../types';

interface NavbarProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  onCartClick: () => void;
}

export default function Navbar({ currentView, setCurrentView, onCartClick }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { cartCount, wishlistCount } = useCart();
  const { user, signout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', view: 'home' as ViewMode },
    { name: 'Men', view: 'products' as ViewMode },
    { name: 'Women', view: 'products' as ViewMode },
    { name: 'Kids', view: 'products' as ViewMode },
    { name: 'Accessories', view: 'products' as ViewMode },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-primary-950/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <button
            onClick={() => setCurrentView('home')}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-primary-900 dark:bg-white rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
              <span className="text-white dark:text-primary-900 font-bold text-xl">L</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary-900 dark:text-white">
              LUXE
            </span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setCurrentView(link.view)}
                className="relative text-sm font-medium text-primary-700 dark:text-primary-200 hover:text-primary-900 dark:hover:text-white transition-colors duration-200 group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-900 dark:bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <button
              aria-label="Search"
              className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
            >
              <Search className="w-5 h-5 text-primary-700 dark:text-primary-200" />
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-primary-700 dark:text-primary-200" />
              ) : (
                <Sun className="w-5 h-5 text-primary-700 dark:text-primary-200" />
              )}
            </button>

            <button
              onClick={() => setCurrentView('wishlist')}
              className="relative p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
            >
              <Heart className="w-5 h-5 text-primary-700 dark:text-primary-200" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-primary-700 dark:text-primary-200" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-900 dark:bg-white text-white dark:text-primary-900 text-xs rounded-full flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-200">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={signout}
                  className="flex items-center space-x-2 btn-primary py-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('login')}
                className="hidden md:flex items-center space-x-2 btn-primary py-2"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </button>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-800 transition-colors duration-200"
              aria-label="Menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-primary-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-primary-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-2 bg-white dark:bg-primary-950 border-t border-primary-200 dark:border-primary-800">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                setCurrentView(link.view);
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-3 rounded-lg text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-200 font-medium"
            >
              {link.name}
            </button>
          ))}
          {user ? (
            <button
              onClick={() => { signout(); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 rounded-lg text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-200 font-medium"
            >
              Sign Out ({user.name.split(' ')[0]})
            </button>
          ) : (
            <button
              onClick={() => { setCurrentView('login'); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-3 rounded-lg text-primary-700 dark:text-primary-200 hover:bg-primary-50 dark:hover:bg-primary-900 transition-colors duration-200 font-medium"
            >
              Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
