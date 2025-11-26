import PropTypes from 'prop-types';
import ArticleCard from './ArticleCard';
import Loader from './Loader';
import ErrorBanner from './ErrorBanner';

const ArticleList = ({ articles, error }) => {
  if (error) return <ErrorBanner message={error} />;
  if (!articles.length) return <div className="text-center py-10 text-gray-500">No articles found.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
};

ArticleList.propTypes = {
  articles: PropTypes.array.isRequired,
  error: PropTypes.string,
};

export default ArticleList;
