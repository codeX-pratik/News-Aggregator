# News Aggregator Web App

A modern, responsive news aggregation application built with React, Vite, and Tailwind CSS. This application fetches real-time news from external APIs (NewsData.io, GNews) and displays them in a clean, user-friendly interface.

## 🚀 Features

-   **Live News Feed**: Fetches the latest news articles from supported APIs.
-   **Category Filtering**: Filter news by categories like Business, Technology, Sports, etc.
-   **Search Functionality**: Search for specific topics or keywords.
-   **Responsive Design**: Fully responsive UI that works seamlessly on Desktop, Tablet, and Mobile.
-   **Dark Mode**: Built-in dark/light mode toggle.
-   **Article Details**: Dedicated page to view article summaries and metadata.
-   **Multi-API Support**: Supports **NewsData.io** and **GNews.io** with automatic detection.
-   **Proxy Support**: Configured with Vite proxy to bypass CORS restrictions during development.

## 🛠️ Tech Stack

-   **Frontend**: React (v18), Vite
-   **Styling**: Tailwind CSS (v4)
-   **Routing**: React Router DOM
-   **State Management**: React Context API (for Theme), Custom Hooks
-   **Icons**: Custom SVG Icons

## 📂 Project Structure

```
src/
├── api/            # API handling logic (newsApi.js)
├── components/     # Reusable UI components (Navbar, ArticleList, etc.)
├── context/        # Context providers (ThemeContext)
├── hocks/          # Higher-Order Components (withLoader)
├── hooks/          # Custom hooks (useNews, useTheme)
├── pages/          # Page components (Home, ArticleDetail)
├── utils/          # Utility functions
├── App.jsx         # Main application component
└── main.jsx        # Entry point
```

## ⚙️ Setup & Installation

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd News-Aggregator
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your API credentials.

    **Option A: NewsData.io (Recommended)**
    ```env
    VITE_NEWS_API_BASE_URL=https://newsdata.io/api/1
    VITE_NEWS_API_KEY=your_newsdata_api_key_here
    ```

    **Option B: GNews.io**
    ```env
    VITE_NEWS_API_BASE_URL=https://gnews.io/api/v4
    VITE_NEWS_API_KEY=your_gnews_api_key_here
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The app will start at `http://localhost:5173`.

## 📖 How It Works

1.  **API Handling**: The `src/api/newsApi.js` file detects the configured API (NewsData or GNews) and constructs the appropriate request URL.
2.  **Proxying**: To avoid CORS errors in the browser, requests are routed through a proxy configured in `vite.config.js` (`/newsdata-proxy` or `/gnews-proxy`).
3.  **Data Fetching**: The `useNews` hook manages the data fetching state (loading, error, data) and passes it to the UI.
4.  **Display**: The `Home` page renders the `Navbar`, `CategoryFilter`, and `ArticleList`. Clicking an article navigates to the `ArticleDetail` page.

## ⚠️ Troubleshooting

-   **CORS Errors / Data Not Loading**: Ensure you have restarted the server (`npm run dev`) after changing `.env` or `vite.config.js`. The proxy needs a restart to pick up changes.
-   **403 Forbidden**: Your API key might be invalid or expired. Check your provider's dashboard.
-   **API Limit Reached**: If the API quota is exceeded, the app will fallback to local sample data (if configured) or show an error.

## 📄 License

This project is open-source and available under the MIT License.
