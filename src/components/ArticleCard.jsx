import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const { title, description, urlToImage, source, publishedAt } = article;
  const fallbackImage = "https://via.placeholder.com/400x200?text=No+Image";
  
  // Create a slug for the ID
  const articleId = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'article';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      <img 
        src={urlToImage || fallbackImage} 
        alt={title} 
        className="w-full h-48 object-cover"
        onError={(e) => { e.target.src = fallbackImage; }}
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
          <span className="font-semibold text-blue-600">{source.name}</span>
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
          <Link to={`/article/${articleId}`} state={{ article }} className="hover:text-blue-600">
            {title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {description || "No description available."}
        </p>
        <Link 
          to={`/article/${articleId}`} 
          state={{ article }}
          className="inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors text-center mt-auto"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

ArticleCard.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.string,
    source: PropTypes.shape({
      name: PropTypes.string,
    }),
    publishedAt: PropTypes.string,
  }).isRequired,
};

export default ArticleCard;
