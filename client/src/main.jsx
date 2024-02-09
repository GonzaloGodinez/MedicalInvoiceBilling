import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
// import Login from './components/LoginForm';
import SearchProviders from './pages/SearchProviders.jsx'
import BillingPage from './components/BillingPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        Index: true,
        element: <BillingPage />
      },
      // login is included in the navbar.jsx file
      // {
      //   path: '/login',
      //   element: <Login />
      // },
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
