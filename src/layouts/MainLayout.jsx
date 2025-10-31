import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MainLayout() {
  return (
    <div>
      <div className="max-w-[1240px] mx-auto px-4">
        {/* Navbar Section */}
        <Navbar />

        {/* Page Content */}
        <main className="min-h-screen">
          <Outlet />
        </main>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
