# News Aggregator - Project Report

## 1. Project Overview
The **News Aggregator** is a modern, responsive web application designed to provide users with a centralized platform for reading news from various global sources. It offers a clean, distraction-free interface with features like category filtering, real-time search, and a seamless dark mode experience.

**Objective:** To build a robust frontend application that handles real-world API constraints (CORS, rate limits) while delivering a premium user experience.

## 2. Technical Architecture

### Tech Stack
-   **Frontend Framework:** React.js (v18)
-   **Build Tool:** Vite (for fast HMR and optimized builds)
-   **Styling:** Tailwind CSS (Utility-first CSS for responsive design)
-   **Routing:** React Router DOM (v6)
-   **State Management:** React Context API (for Theme) & Custom Hooks

### Key Architectural Decisions
1.  **Component-Based Design:** The UI is broken down into small, reusable components (`ArticleCard`, `Navbar`, `Pagination`) to ensure maintainability and scalability.
## 4. Challenges & Solutions

### Challenge 1: CORS Errors
**Problem:** Browsers block frontend requests to third-party APIs that don't explicitly allow the origin.
**Solution:** Configured `vite.config.js` to act as a proxy server. Requests to `/newsdata-proxy` are forwarded to `https://newsdata.io`, bypassing the browser's security check during development.

### Challenge 2: API Rate Limits
**Problem:** Free news APIs have strict daily limits (e.g., 100 requests/day).
**Solution:** Implemented a **Fallback Mechanism**. When the API returns an error or 0 results, the `newsApi.js` layer catches it and serves data from a local `news.json` file. This allows development and testing to continue without interruption.

### Challenge 3: "All" Category Logic
**Problem:** Some APIs don't have an "all" category, or they require specific parameters.
**Solution:** Implemented custom logic in `newsApi.js`. When "All" is selected, the app either omits the category parameter (fetching everything) or requests a mix of major categories, depending on the specific API provider being used.

## 5. Future Improvements
-   **Serverless Backend:** Deploy a Vercel/Netlify function to handle API proxying in production.
-   **Infinite Scroll:** Replace pagination with infinite scrolling for a more modern feel.
-   **User Accounts:** Allow users to save favorite articles or customize their feed.
-   **Caching:** Implement React Query or local caching to reduce API calls and improve speed.

## 6. Conclusion
The News Aggregator project successfully demonstrates the ability to build a functional, aesthetically pleasing React application that handles real-world data fetching complexities. It balances technical robustness (error handling, proxying) with user-centric design (responsiveness, theming).
