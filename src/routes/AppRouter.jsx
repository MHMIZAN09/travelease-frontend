import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Contact from '../pages/Contact';
import Packages from '../pages/Packages';

import CreateDestination from '../pages/admin/CreateDestination';
import DestinationsPage from '../pages/DestinationsPage';
import CreatePackageForm from '../pages/admin/CreatePackage';
import PackagesByDestination from '../pages/PackagesByDestination';
import PackageDetails from '../pages/PackageDetails';

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
        element: <DestinationsPage />,
      },
      {
        path: 'addDestination',
        element: <CreateDestination />,
      },
      {
        path: 'admin/createPackage',
        element: <CreatePackageForm />,
      },
      {
        path: 'packages/destination/:destinationId',
        element: <PackagesByDestination />,
      },
      {
        path: 'packages/:id',
        element: <PackageDetails />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default route;
