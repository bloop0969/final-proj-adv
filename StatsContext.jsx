import { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const StatsContext = createContext();

export function StatsProvider({ children }) {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    revenue: '0.00'
  });

  useEffect(() => {
    // Listen for products changes
    const productsUnsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      setStats(prev => ({
        ...prev,
        totalProducts: snapshot.size
      }));
    });

    // Listen for orders changes
    const ordersUnsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const orders = snapshot.docs.map(doc => doc.data());
      const totalRevenue = orders.reduce((sum, order) => {
        const orderTotal = typeof order.total === 'string' 
          ? parseFloat(order.total) 
          : order.total;
        return sum + orderTotal;
      }, 0);
      
      setStats(prev => ({
        ...prev,
        totalOrders: snapshot.size,
        revenue: totalRevenue.toFixed(2)
      }));
    });

    return () => {
      productsUnsubscribe();
      ordersUnsubscribe();
    };
  }, []);

  return (
    <StatsContext.Provider value={stats}>
      {children}
    </StatsContext.Provider>
  );
}

export const useStats = () => useContext(StatsContext);
