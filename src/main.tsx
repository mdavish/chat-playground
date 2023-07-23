import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.tsx'
import SearchResultsPage from './routes/SearchResultsPage.tsx'
import ComponentPlayground from './routes/ComponentPlayground.tsx'
import LandingPage from './routes/LandingPage.tsx'
import PopupPage from './routes/Popup.tsx'
import Google from './routes/Google.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/search-results-demo",
    element: <SearchResultsPage />,
  },
  {
    path: "/component-playground",
    element: <ComponentPlayground />,
  },
  {
    path: "/popup",
    element: <PopupPage />,
  },
  {
    path: "/landing-page",
    element: <LandingPage />,
  },
  {
    path: "/google",
    element: <Google />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
