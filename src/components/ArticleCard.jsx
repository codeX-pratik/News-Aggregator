import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  const { title, description, urlToImage, source, publishedAt } = article;
  const fallbackImage = "https://via.placeholder.com/400x200?text=No+Image";
  
  // Create a slug for the ID
  const articleId = title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'article';

  return (
    <div className="group bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-gray-100 dark:border-gray-800 overflow-hidden">
      {/* Image Container with Zoom Effect */}
      <div className="relative overflow-hidden h-52">
        <img 
          src={urlToImage || fallbackImage} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        {/* Floating Source Badge */}
        <div className="absolute top-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          {source.name}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        {/* Date */}
        <div className="flex items-center text-xs text-gray-400 dark:text-gray-500 mb-3">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {new Date(publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link to={`/article/${articleId}`} state={{ article }}>
            {title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3 flex-grow leading-relaxed">
          {description || "No description available for this article. Click to read the full story."}
        </p>

        {/* Footer Link */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
          <Link 
            to={`/article/${articleId}`} 
            state={{ article }}
            className="inline-flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            Read Article
            <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </Link>
        </div>
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
