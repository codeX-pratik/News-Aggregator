# Project Structure & Component Explanation

This document provides a high-level overview of the News Aggregator's codebase structure and how the different components interact.

## 📂 Directory Structure

```
src/
├── api/            # API integration logic
├── components/     # Reusable UI components
├── context/        # Global state (Theme)
├── hocks/          # Higher-Order Components
├── hooks/          # Custom React Hooks
├── pages/          # Page-level components
├── App.jsx         # Main application layout & routing
└── main.jsx        # Entry point
```

## 🧩 Key Components

### 1. Core Application (`src/App.jsx`)
-   **Role:** The root component that sets up the application shell.
-   **Functionality:**
    -   Initializes the `Router` for navigation.
    -   Wraps the entire app in the `Navbar` and `BackToTop` components so they persist across pages.
    -   Defines the routes (`/`, `/article/:id`).

### 2. Pages (`src/pages/`)
-   **`Home.jsx`**:
    -   The main landing page.
    -   Manages state for `category`, `page`, and `searchQuery`.
    -   Uses the `useNews` hook to fetch data.
    -   Composes `CategoryFilter`, `ArticleList`, and `Pagination` to build the UI.
-   **`ArticleDetail.jsx`**:
    -   Displays the full view of a selected article.
    -   Receives article data via React Router's `location.state` (preventing the need for a re-fetch).
    -   Provides a "Back to News" button and a link to the original source.

### 3. UI Components (`src/components/`)
-   **`Navbar.jsx`**:
    -   Global navigation bar.
    -   Contains the logo, search bar, and theme toggle.
    -   Updates the URL search params (`?q=...`) to trigger searches on the Home page.
-   **`ArticleList.jsx`**:
    -   Receives an array of articles and renders a grid of `ArticleCard` components.
    -   Handles the "No results" state.
-   **`ArticleCard.jsx`**:
    -   Individual card component for a news item.
    -   Displays image, title, description, and source.
    -   Clicking it navigates to `/article/:id`.
-   **`CategoryFilter.jsx`**:
    -   Horizontal scrollable list of category buttons (All, Business, Tech, etc.).
-   **`Pagination.jsx`**:
    -   Simple Previous/Next controls to navigate through pages of news.
-   **`BackToTop.jsx`**:
    -   A floating button that appears when scrolling down, allowing quick return to the top.

### 4. Data Layer (`src/api/` & `src/hooks/`)
-   **`newsApi.js`**:
    -   Centralized API logic.
    -   Handles requests to external APIs (NewsData.io).
    -   **Critical Feature:** Implements a robust **fallback mechanism**. If the API fails or returns 0 results, it seamlessly switches to local `news.json` data.
-   **`useNews.js`**:
    -   Custom hook that manages the fetching lifecycle (loading, error, data).
    -   Automatically re-fetches when dependencies (category, page, query) change.

### 5. State Management (`src/context/`)
-   **`ThemeContext.js`**:
    -   Provides global `theme` state ('light' or 'dark').
    -   Persists the user's preference in `localStorage`.

## 🔄 Data Flow

1.  **User Action:** User clicks a category or searches.
2.  **State Update:** `Home.jsx` updates its state (e.g., `category='technology'`).
3.  **Hook Trigger:** `useNews` detects the change and calls `fetchNews` from `newsApi.js`.
4.  **API Request:** `newsApi.js` calls the external API (via proxy).
5.  **Fallback (if needed):** If the API fails, `newsApi.js` fetches `news.json` and processes it.
6.  **Render:** Data is returned to `Home.jsx`, which passes it down to `ArticleList` -> `ArticleCard`.
