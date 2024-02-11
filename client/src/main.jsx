import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
// import Login from './components/LoginForm';
import SearchProviders from './pages/SearchProviders.jsx'
import BillingPage from './components/BillingPage'
// import CreatePatient from './pages/CreatePatient'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   Index: true,
      //   element: <CreatePatient />
      // },
      {
        Path: "/billing",
        element: <BillingPage />
      },
      // login is included in the navbar.jsx file
       {
        path: '/provider',
         element: <SearchProviders />
       },
      //  {
      //   path: '/signup',
      //    element: <SignUpForm />
      //  },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
