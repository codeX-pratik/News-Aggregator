import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import Navbar from './components/Navbar';
import BackToTop from './components/BackToTop';
import { useTheme } from './hooks/useTheme';

function App() {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-500 relative overflow-hidden ${theme === 'dark' ? 'bg-animate-dark text-white' : 'bg-animate-light text-gray-900'}`}>
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob ${theme === 'dark' ? 'bg-purple-900' : 'bg-purple-300'}`}></div>
          <div className={`absolute top-0 right-1/4 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 ${theme === 'dark' ? 'bg-blue-900' : 'bg-yellow-300'}`}></div>
          <div className={`absolute -bottom-32 left-1/3 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 ${theme === 'dark' ? 'bg-indigo-900' : 'bg-pink-300'}`}></div>
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 pt-16">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
          <BackToTop />
        </div>
      </div>
    </Router>
  );
}

export default App;
