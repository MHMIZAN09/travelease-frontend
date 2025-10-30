import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';

const route = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, // default route -> "/"
        element: <Home />,
      },
    ],
  },
]);

export default route;
