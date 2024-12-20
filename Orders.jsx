import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';
import OrderList from '../features/orders/components/OrderList';
import PageContainer from '../components/layout/PageContainer';
import LoadingSpinner from '../components/ui/LoadingSpinner';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'orders'),
      where('customer', '==', user.email)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer title="Orders">
      <OrderList orders={orders} />
    </PageContainer>
  );
}

export default Orders;