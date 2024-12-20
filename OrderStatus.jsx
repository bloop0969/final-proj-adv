import PropTypes from 'prop-types';

function OrderStatus({ status, onChange }) {
  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value)}
      className={`px-3 py-1 rounded-full text-sm ${
        status === 'Processing' 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-green-100 text-green-800'
      }`}
    >
      <option value="Processing">Processing</option>
      <option value="Delivered">Delivered</option>
    </select>
  );
}

OrderStatus.propTypes = {
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default OrderStatus;
