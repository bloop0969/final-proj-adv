import PropTypes from 'prop-types';
import OrderRow from './OrderRow';

function OrderList({ orders }) {
  if (!orders.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderRow key={order.id} {...order} />
      ))}
    </div>
  );
}

OrderList.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      customer: PropTypes.string.isRequired,
      items: PropTypes.number.isRequired,
      total: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      status: PropTypes.string.isRequired
    })
  ).isRequired
};

export default OrderList;
