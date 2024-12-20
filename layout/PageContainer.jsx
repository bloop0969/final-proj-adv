import PropTypes from 'prop-types';

function PageContainer({ children, title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {title && <h1 className="text-2xl font-bold mb-8">{title}</h1>}
      {children}
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default PageContainer;