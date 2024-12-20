import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import DeleteConfirmModal from '../../../components/modals/DeleteConfirmModal';
import OrderStatus from './OrderStatus';
import { useOrderActions } from '../hooks/useOrderActions';
import { formatOrderTotal } from '../utils/orderFormatters';

function OrderRow({ id, customer, items, total, status }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { handleStatusChange, handleDelete } = useOrderActions();

  const onStatusChange = (newStatus) => {
    handleStatusChange(id, newStatus);
  };

  const onDelete = async () => {
    await handleDelete(id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-lg shadow-sm p-4 mb-4"
      >
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{customer}</h3>
            <p className="text-sm text-gray-500">
              {items} items · ${formatOrderTotal(total)}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <OrderStatus status={status} onChange={onStatusChange} />
            <button
              onClick={() => setShowDeleteModal(true)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={onDelete}
        title="Delete Order"
        message="Are you sure you want to delete this order? This action cannot be undone."
      />
    </>
  );
}

OrderRow.propTypes = {
  id: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  items: PropTypes.number.isRequired,
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string.isRequired
};

export default OrderRow;
