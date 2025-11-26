const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

const fetchLocalNews = async ({ category = 'general', query = '', page = 1, pageSize = 10 } = {}) => {
  console.warn('Using local news.json fallback');
  try {
    const response = await fetch('/news.json');
    const data = await response.json();
    
    // Check for 'results' (raw API format) or 'articles' (pre-formatted)
    const results = data.results || data.articles || [];
    
    // Map results if they match the raw API format
    let articles = results.map(item => ({
      source: { 
        id: item.source_id || item.source?.id || 'unknown', 
        name: item.source_name || item.source?.name || 'Unknown' 
      },
      author: item.creator?.[0] || item.author || 'Unknown',
      title: item.title || 'No Title',
      description: item.description || 'No Description',
      url: item.link || item.url || '#',
      urlToImage: item.image_url || item.urlToImage || null,
      publishedAt: item.pubDate || item.publishedAt || new Date().toISOString(),
      content: item.content || ''
    }));

    // Deduplicate articles based on URL or Title
    const seen = new Set();
    articles = articles.filter(article => {
      const duplicate = seen.has(article.url) || seen.has(article.title);
      seen.add(article.url);
      seen.add(article.title);
      return !duplicate;
    });

    // Apply Filtering
    if (category && category !== 'general' && category !== 'top' && category !== 'all') {
      articles = articles.filter(article => {
        const searchString = `${article.title} ${article.description} ${article.content}`.toLowerCase();
        return searchString.includes(category.toLowerCase());
      });
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      articles = articles.filter(article => 
        (article.title && article.title.toLowerCase().includes(lowerQuery)) ||
        (article.description && article.description.toLowerCase().includes(lowerQuery))
      );
    }

    // Simulate large dataset ONLY for general browsing (no specific query/category)
    // If user is searching or filtering, show exact results (don't duplicate)
    const isGeneralBrowsing = (!query && (category === 'general' || category === 'top' || category === 'all'));
    
    if (isGeneralBrowsing && articles.length > 0) {
      const totalSimulatedResults = 679; 
      let allArticles = [];
      while (allArticles.length < totalSimulatedResults) {
        allArticles = [...allArticles, ...articles];
      }
      // Trim to exact size
      allArticles = allArticles.slice(0, totalSimulatedResults);
      
      // Apply Pagination Slicing for simulated data
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = allArticles.slice(startIndex, endIndex);

      return {
        status: 'ok',
        articles: paginatedArticles,
        totalResults: totalSimulatedResults
      };
    } else {
      // For search/filter, return exact matches without duplication
      // We still need to handle pagination if there are many real matches (though unlikely for local data)
      // But for now, just returning the matches is better than 10x duplicates.
      
      // If we want to support pagination for real matches:
      const totalRealResults = articles.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedArticles = articles.slice(startIndex, endIndex);

      return {
        status: 'ok',
        articles: paginatedArticles,
        totalResults: totalRealResults
      };
    }
  } catch (error) {
    console.error('Error fetching local news:', error);
    return { status: 'error', articles: [], totalResults: 0 };
  }
};

export const fetchNews = async ({ category = 'general', page = 1, pageSize = 10, query = '' }) => {
  if (!API_KEY || !API_BASE_URL) {
    console.warn('API Key or Base URL missing.');
    return fetchLocalNews({ category, query, page, pageSize });
  }

  try {
    let endpoint = '';
    let params = new URLSearchParams();

    // NewsData.io Logic
    if (API_BASE_URL.includes('newsdata.io')) {
      const proxyBase = '/newsdata-proxy/api/1';
      endpoint = `${proxyBase}/latest`;
      
      params.append('apikey', API_KEY);
      params.append('language', 'en');
      params.append('size', '10'); 

      if (query) {
        params.append('q', query);
      } else {
        // If 'all', do not append category (fetch from all)
        if (category !== 'all') {
           const apiCategory = category === 'general' ? 'top' : category;
           params.append('category', apiCategory);
        }
      }
    } else {
      console.warn('Unsupported API Base URL. Falling back to local data.');
      return fetchLocalNews({ category, query, page, pageSize });
    }

    const url = `${endpoint}?${params.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const results = data.articles || data.results || [];

    if (!results.length) {
      console.warn('API returned 0 results, falling back to local data.');
      return fetchLocalNews({ category, query, page, pageSize });
    }

    // Map results
    const articles = results.map(item => {
      // GNews / Standard Mapping
      return {
        source: { 
          id: item.source?.url || item.source_id || 'unknown', 
          name: item.source?.name || item.source_name || 'Unknown' 
        },
        author: item.creator?.[0] || item.author || 'Unknown',
        title: item.title || 'No Title',
        description: item.description || 'No Description',
        url: item.link || item.url || '#',
        urlToImage: item.image || item.image_url || item.urlToImage || null,
        publishedAt: item.pubDate || item.publishedAt || new Date().toISOString(),
        content: item.content || ''
      };
    });

    // Deduplicate articles based on URL or Title
    const seen = new Set();
    const uniqueArticles = articles.filter(article => {
      const duplicate = seen.has(article.url) || seen.has(article.title);
      seen.add(article.url);
      seen.add(article.title);
      return !duplicate;
    });

    return {
      status: 'ok',
      articles: uniqueArticles,
      totalResults: data.totalResults || uniqueArticles.length
    };

  } catch (error) {
    console.error('Fetch error:', error);
    return fetchLocalNews({ category, query, page, pageSize });
  }
};
