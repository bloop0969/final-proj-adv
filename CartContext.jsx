import { createContext, useContext, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const checkout = async () => {
    if (!user) {
      toast.error('Please login to checkout');
      return;
    }

    try {
      const total = cartItems.reduce((sum, item) => sum + item.price, 0);
      
      await addDoc(collection(db, 'orders'), {
        customer: user.email,
        items: cartItems.length,
        total: total.toFixed(2),
        status: 'Processing',
        createdAt: new Date()
      });

      clearCart();
      toast.success('Order placed successfully!');
      return true;
    } catch (error) {
      toast.error('Error placing order');
      console.error('Checkout error:', error);
      return false;
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      checkout
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
