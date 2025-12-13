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
import CreatePackage from './../pages/admin/CreatePackage';
import ManageUsers from './../pages/admin/ManageUsers';
import ManagePackages from '../pages/admin/ManagePackages';
import ManageDestinations from '../pages/admin/ManageDestinations';
import Booking from '../pages/BookingPage';
import BookingSuccess from '../pages/BookingSuccess';
import DashboardHome from '../pages/user/DashboardHome';
import UserDashboardLayout from '../pages/user/DashboardLayout';
import UserPayments from '../pages/user/UserPayments';
import AdminDashboardLayout from '../pages/admin/AdminDashboardLayout';
import AllBookings from '../pages/admin/AllBookings';
import ForgotPassword from '../pages/ForgotPassword';

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
        path: 'forgot-password',
        element: <ForgotPassword />,
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
            <UserDashboardLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: 'profile',
            element: <UserProfile />,
          },
          {
            path: 'my-bookings',
            element: <UserBooking />,
          },
          {
            path: 'payments',
            element: <UserPayments />,
          },
        ],
      },

      {
        path: 'my-bookings',
        element: (
          <PrivateRoute>
            <UserBooking />
          </PrivateRoute>
        ),
      },
      {
        path: 'booking/:id',
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: 'booking-success/:id',
        element: (
          <PrivateRoute>
            <BookingSuccess />
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
        path: '/admin',
        element: <AdminDashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: <AdminDashboard />,
          },
          {
            path: 'manageUsers',
            element: <ManageUsers />,
          },
          {
            path: 'managePackages',
            element: <ManagePackages />,
          },
          {
            path: 'createPackage',
            element: <CreatePackage />,
          },
          {
            path: 'manageDestinations',
            element: <ManageDestinations />,
          },
          {
            path: 'createDestination',
            element: <CreateDestination />,
          },
          {
            path: 'bookings',
            element: <AllBookings />,
          },
        ],
      },
      {
        path: 'admin/users',
        element: <div>manage users</div>,
      },
      {
        path: 'admin/createPackage',
        element: <CreatePackage />,
      },
      {
        path: 'admin/manageUsers',
        element: <ManageUsers />,
      },
      {
        path: 'admin/managePackages',
        element: <ManagePackages />,
      },
      {
        path: 'admin/manageDestinations',
        element: <ManageDestinations />,
      },
      {
        path: 'admin/createDestinations',
        element: <CreateDestination />,
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
