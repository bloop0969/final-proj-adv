import { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';
import { formatPrice } from '../utils/formatters';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          total: formatPrice(data.total)
        };
      });
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const deleteOrder = async (id) => {
    try {
      await deleteDoc(doc(db, 'orders', id));
      toast.success('Order deleted successfully');
    } catch (error) {
      toast.error('Error deleting order');
      console.error('Error deleting order:', error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status });
      toast.success('Order status updated');
    } catch (error) {
      toast.error('Error updating order status');
      console.error('Error updating order:', error);
    }
  };

  const addOrder = async (orderData) => {
    try {
      const formattedTotal = formatPrice(orderData.total);
      
      await addDoc(collection(db, 'orders'), {
        ...orderData,
        total: formattedTotal,
        createdAt: new Date().toISOString()
      });
      toast.success('Order added successfully');
    } catch (error) {
      toast.error('Error adding order');
      console.error('Error adding order:', error);
    }
  };

  return (
    <OrderContext.Provider value={{
      orders,
      loading,
      updateOrderStatus,
      addOrder,
      deleteOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
