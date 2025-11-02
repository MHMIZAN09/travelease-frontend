import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Contact from '../pages/Contact';
import Packages from '../pages/Packages';
import Destinations from './../pages/Destinations';

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'package',
        element: <Packages />,
      },
      {
        path: 'destination',
        element: <Destinations />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default route;
