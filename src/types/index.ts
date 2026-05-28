export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: Category;
  categorySlug: string;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isTrending?: boolean;
  stock: number;
}

export type Category = 'men' | 'women' | 'kids' | 'accessories';

export interface CategoryInfo {
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export type ViewMode = 'home' | 'products' | 'cart' | 'wishlist' | 'login' | 'signup' | 'product-detail' | 'checkout';
