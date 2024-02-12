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
      //{
      //   path: '/signup',
      //   element: <Signup />
      // }, {
      //   path: '/profiles/:username',
      //   element: <Profile />
      // }, {
      //   path: '/me',
      //   element: <Profile />
      // }, {
      //   path: '/thoughts/:thoughtId',
      //   element: <SingleThought />
      // }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)


/*
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
// import Login from './components/LoginForm';
import SearchProviders from './pages/SearchProviders.jsx'
import BillingPage from './components/BillingPage'
import CreatePatient from './pages/CreatePatient'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        Index: true,
        element: <CreatePatient />
      },
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
*/