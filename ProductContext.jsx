import { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import toast from 'react-hot-toast';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addProduct = async (product) => {
    try {
      await addDoc(collection(db, 'products'), product);
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Error adding product');
      console.error('Error adding product:', error);
    }
  };

  const updateProduct = async (id, updates) => {
    try {
      await updateDoc(doc(db, 'products', id), updates);
      toast.success('Product updated successfully');
    } catch (error) {
      toast.error('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Error deleting product');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);
