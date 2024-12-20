import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

function ProductCard({ id, name, price, image, stock }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (stock > 0) {
      addToCart({ id, name, price, image });
      toast.success('Added to cart!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-sm overflow-hidden"
    >
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price}</p>
        <p className="text-sm text-gray-500 mt-1">
          {stock} in stock
        </p>
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className={`mt-4 w-full py-2 px-4 rounded-md ${
            stock > 0
              ? 'bg-emerald-500 text-white hover:bg-emerald-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired
};

export default ProductCard;
