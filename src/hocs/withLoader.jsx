import Loader from '../components/Loader';

const withLoader = (WrappedComponent) => {
  const WithLoader = ({ loading, ...props }) => {
    if (loading) return <Loader />;
    return <WrappedComponent {...props} />;
  };
  
  // Set display name for debugging
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithLoader.displayName = `WithLoader(${displayName})`;
  
  return WithLoader;
};

export default withLoader;
