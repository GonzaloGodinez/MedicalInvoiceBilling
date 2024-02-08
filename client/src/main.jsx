import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import Login from './components/LoginForm';
import SearchProviders from './pages/SearchProviders.jsx';
import BillingPage from './components/BillingPage';
// import Searchprovider from './pages/Searchproviders';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        Index: true,
        element: <BillingPage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/provider/:providerId',
        element: <SearchProviders />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
