import { useState, useEffect } from 'react';
import { fetchNews } from '../api/newsApi';

export const useNews = (category, page, searchQuery, pageSize = 10) => {
  const [articles, setArticles] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchNews({ category, page, pageSize, query: searchQuery });
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [category, page, searchQuery]);

  return { articles, totalResults, loading, error };
};
