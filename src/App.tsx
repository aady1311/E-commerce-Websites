import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import TrendingProducts from './components/TrendingProducts';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import ProductListing from './components/ProductListing';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Login from './components/Login';
import Signup from './components/Signup';
import Checkout from './components/Checkout';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import { ViewMode, Product } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
    setIsCartOpen(false);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'wishlist':
        return <Wishlist setCurrentView={handleViewChange} />;
      case 'login':
        return <Login setCurrentView={handleViewChange} />;
      case 'signup':
        return <Signup setCurrentView={handleViewChange} />;
      case 'checkout':
        return <Checkout setCurrentView={handleViewChange} />;
      case 'products':
        return <ProductListing setCurrentView={handleViewChange} onViewDetails={handleViewDetails} />;
      case 'home':
      default:
        return (
          <>
            <Hero setCurrentView={handleViewChange} />
            <Categories setCurrentView={handleViewChange} />
            <TrendingProducts setCurrentView={handleViewChange} onViewDetails={handleViewDetails} />
            <Features />
            <Testimonials />
            <Newsletter />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-white dark:bg-primary-950 transition-colors duration-300">
            <Navbar
              currentView={currentView}
              setCurrentView={handleViewChange}
              onCartClick={handleCartClick}
            />

            <main>
              {renderContent()}
            </main>

            {currentView === 'home' && <Footer />}

            <Cart
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              setCurrentView={handleViewChange}
            />

            <ProductModal
              product={selectedProduct}
              isOpen={isProductModalOpen}
              onClose={handleCloseProductModal}
            />
          </div>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
