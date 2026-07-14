import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User, Product, CartItem } from '../types/index';
import { initialProducts } from '../data/products';

interface AppContextType {
  users: User[];
  currentUser: User | null;
  products: Product[];
  cart: CartItem[];
  registerUser: (user: User) => void;
  loginUser: (email: string, pass: string) => void;
  logoutUser: () => void;
  addToCart: (product: Product) => void;
  clearCart: () => void;
  confirmPurchase: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Inicialización y carga de API
  useEffect(() => {
    const loadInitialData = async () => {
      // 1. Cargar Usuarios (API JSONPlaceholder)
      const storedUsers = localStorage.getItem('ecommerce_users');
      if (!storedUsers) {
        try {
          const res = await fetch('https://jsonplaceholder.typicode.com/users');
          if (!res.ok) throw new Error('Error en la API');
          const data = await res.json();
          const apiUsers: User[] = data.slice(0, 3).map((u: any) => ({
            name: u.name,
            email: u.email.toLowerCase(),
            dob: '2000-01-01',
            password: 'Inacap123',
            failedAttempts: 0,
            isLocked: false
          }));
          setUsers(apiUsers);
          localStorage.setItem('ecommerce_users', JSON.stringify(apiUsers));
        } catch (error) {
          console.error('Error cargando usuarios API. Continuando sin ellos...', error);
          setUsers([]);
        }
      } else {
        setUsers(JSON.parse(storedUsers));
      }

      // 2. Cargar Sesión
      const session = localStorage.getItem('ecommerce_session');
      if (session) setCurrentUser(JSON.parse(session));

      // 3. Cargar Productos
      const storedProducts = localStorage.getItem('ecommerce_products');
      if (!storedProducts) {
        setProducts(initialProducts);
        localStorage.setItem('ecommerce_products', JSON.stringify(initialProducts));
      } else {
        setProducts(JSON.parse(storedProducts));
      }

      // 4. Cargar Carrito
      const storedCart = localStorage.getItem('ecommerce_cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };

    loadInitialData();
  }, []);

  // Sincronización con LocalStorage
  useEffect(() => { if (users.length) localStorage.setItem('ecommerce_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { localStorage.setItem('ecommerce_session', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { if (products.length) localStorage.setItem('ecommerce_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('ecommerce_cart', JSON.stringify(cart)); }, [cart]);

  // Funciones de Autenticación
  const registerUser = (user: User) => {
    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    // Guardado forzado y síncrono para evitar que el navigate() del componente interrumpa el flujo
    localStorage.setItem('ecommerce_users', JSON.stringify(updatedUsers)); 
  };

  const loginUser = (email: string, pass: string) => {
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) throw new Error("Usuario no registrado.");
    
    const user = users[userIndex];
    if (user.isLocked) throw new Error("Cuenta bloqueada por múltiples intentos fallidos.");

    if (user.password !== pass) {
      const newUsers = [...users];
      newUsers[userIndex].failedAttempts += 1;
      if (newUsers[userIndex].failedAttempts >= 3) {
        newUsers[userIndex].isLocked = true;
      }
      setUsers(newUsers);
      throw new Error(`Contraseña incorrecta. Intentos restantes: ${3 - newUsers[userIndex].failedAttempts}`);
    }

    // Reset de intentos al tener éxito
    const newUsers = [...users];
    newUsers[userIndex].failedAttempts = 0;
    setUsers(newUsers);
    setCurrentUser(user);
  };

  const logoutUser = () => setCurrentUser(null);

  // Funciones de Carrito (Manejo dinámico de stock)
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const confirmPurchase = () => {
    // Descontar stock real
    const updatedProducts = products.map(p => {
      const cartItem = cart.find(c => c.product.id === p.id);
      return cartItem ? { ...p, stock: p.stock - cartItem.quantity } : p;
    });
    setProducts(updatedProducts);
    clearCart();
  };

  return (
    <AppContext.Provider value={{ users, currentUser, products, cart, registerUser, loginUser, logoutUser, addToCart, clearCart, confirmPurchase }}>
      {children}
    </AppContext.Provider>
  );
};