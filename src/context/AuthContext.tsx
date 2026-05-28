import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string) => { success: boolean; error?: string };
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, password: string) => {
    const users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) return { success: false, error: 'Invalid email or password' };
    const { password: _, ...userData } = found;
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return { success: true };
  };

  const signup = (name: string, email: string, password: string) => {
    const users: Array<User & { password: string }> = JSON.parse(
      localStorage.getItem('users') || '[]'
    );
    if (users.find((u) => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }
    const newUser = { id: Date.now().toString(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const { password: _, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return { success: true };
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
