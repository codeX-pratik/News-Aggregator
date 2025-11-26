import PropTypes from 'prop-types';

const ErrorBanner = ({ message }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/50 dark:border-red-600 dark:text-red-200 px-4 py-3 rounded relative my-4" role="alert">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

ErrorBanner.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorBanner;
