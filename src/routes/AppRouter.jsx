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
import UserBooking from '../pages/user/UserBooking';
import UserDashboard from '../pages/user/UserDashboard';
import UserProfile from '../pages/user/UserProfile';
import PrivateRoute from './PrivateRoute';
import AdminDashboard from './../pages/admin/AdminDashboard';
import AllUsers from '../pages/admin/UsersTable';

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
        path: 'packages/destination/:destinationId',
        element: <PackagesByDestination />,
      },
      {
        path: 'packages/:id',
        element: <PackageDetails />,
      },
      // private routes
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: 'bookings',
        element: (
          <PrivateRoute>
            <UserBooking />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      // ADMIN

      {
        path: 'admin/dashboard',
        element: <AdminDashboard />,
      },
      {
        path: 'admin/users',
        element: <div>manage users</div>,
      },
      {
        path: 'admin/createPackage',
        element: <CreateDestination />,
      },

      {
        path: 'admin/managePackages',
        element: <div>manage packages</div>,
      },
      {
        path: 'admin/createDestinations',
        element: <div>create destinations</div>,
      },
      {
        path: 'admin/manageDestinations',
        element: <div>manage destinations</div>,
      },
      {
        path: 'admin/allUsers',
        element: <AllUsers />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default route;
