import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from './App.jsx';
import CreatePatient from './pages/CreatePatient' 
import SearchProviders from './pages/SearchProviders.jsx'
import BillingPage from './pages/BillingPage'
import ErrorPage from './pages/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <CreatePatient />
      }, 
      {
        path: '/provider',
         element: <SearchProviders />
       },
       {
        path: "/billing",
        element: <BillingPage />
      },
      // {
      //   path: "/patientInfo",
      //   element: <PatientPage />
      // },
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
