import PropTypes from 'prop-types';

const variants = {
  primary: 'bg-emerald-500 text-white hover:bg-emerald-600',
  secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  danger: 'bg-red-500 text-white hover:bg-red-600'
};

function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  return (
    <button
      className={`px-4 py-2 rounded-md transition duration-200 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  className: PropTypes.string
};

export default Button;