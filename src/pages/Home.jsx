import { useState, useEffect } from 'react';
import { useNews } from '../hooks/useNews';
import ArticleList from '../components/ArticleList';
import CategoryFilter from '../components/CategoryFilter';
import Pagination from '../components/Pagination';
import withLoader from '../hocs/withLoader';
import { useTheme } from '../hooks/useTheme';
import { useSearchParams } from 'react-router-dom';

const ArticleListWithLoader = withLoader(ArticleList);
const PAGE_SIZE = 12;

const Home = () => {
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const { theme } = useTheme();

  const { articles, totalResults, loading, error } = useNews(category, page, searchQuery, PAGE_SIZE);

  const totalPages = Math.ceil(totalResults / PAGE_SIZE);

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    setPage(1);
    setSearchParams({}); // Clear search when changing category
  };

  const handleSearch = (query) => {
    setSearchParams({ q: query });
    setPage(1);
  };

  return (
    <div className="transition-colors duration-300">
      {/* Navbar is now in App.jsx */}
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <CategoryFilter currentCategory={category} onSelectCategory={handleCategoryChange} />

        {searchQuery && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              Search results for: <span className="text-blue-600">"{searchQuery}"</span>
            </h2>
            <button 
              onClick={() => handleSearch('')}
              className="text-sm text-gray-500 hover:text-red-500 mt-1"
            >
              Clear Search
            </button>
          </div>
        )}

        <ArticleListWithLoader loading={loading} articles={articles} error={error} />

        {!loading && !error && totalResults > 0 && (
          <Pagination 
            currentPage={page} 
            totalPages={totalPages || 1} 
            onPageChange={setPage} 
          />
        )}
      </main>
    </div>
  );
};

export default Home;
