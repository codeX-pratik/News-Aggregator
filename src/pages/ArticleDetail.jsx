import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const ArticleDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const article = location.state?.article;

  if (!article) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <p className="text-xl mb-4">Article not found.</p>
        <button 
          onClick={() => navigate('/')}
          className="text-blue-600 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <button 
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-600 hover:underline flex items-center font-medium"
        >
          &larr; Back to News
        </button>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{article.title}</h1>
        
        <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 mb-8 text-sm gap-4">
          <span className="font-semibold bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full text-gray-700 dark:text-gray-300">
            {article.source.name}
          </span>
          <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Unknown Date'}</span>
          {article.author && <span>By {article.author}</span>}
        </div>

        {article.urlToImage && (
          <img 
            src={article.urlToImage} 
            alt={article.title} 
            className="w-full h-auto rounded-xl shadow-lg mb-8 object-cover max-h-[500px]"
          />
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg leading-relaxed mb-6">
            {article.description}
          </p>
          <p className="text-base leading-relaxed opacity-90">
            {article.content ? article.content.replace(/\[\+\d+ chars\]$/, '') : ''}
          </p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-10 pt-8 text-center">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform"
          >
            Read Full Article at Source
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
