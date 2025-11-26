import PropTypes from 'prop-types';

const categories = [
  "all", "top", "business", "entertainment", "health", "science", "sports", "technology", "world", "politics"
];

const CategoryFilter = ({ currentCategory, onSelectCategory }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 mb-6 scrollbar-hide">
      <div className="flex space-x-2 px-1 min-w-max">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium capitalize whitespace-nowrap transition-all duration-200 transform hover:scale-105 ${
              currentCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

CategoryFilter.propTypes = {
  currentCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
