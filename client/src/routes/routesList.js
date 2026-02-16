import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/register/Register';
import Dashboard from '../pages/dashboard/Dashboard';
import BookingsPage from '../pages/bookings/Bookings';
import Packages from '../pages/packages/Packages';
import AddPackage from '../pages/packages/addPackage';
import EditPackage from '../pages/packages/editPackage';
import AddBooking from '../pages/bookings/addBooking';

function Layout({ children }) {
  return (
    <main 
      className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      style={{ flexGrow: 1, width: '100%', maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem', color: '#e5e7eb' }}
    >
      {children}
    </main>
  );
}

function RoutesList({ auth, setAuth }) {
  return (
    <Routes>
      <Route path="/" element={<Layout><Dashboard auth={auth} /></Layout>} />
      <Route path="login" element={<Layout><Login setAuth={setAuth} /></Layout>} />
      <Route path="logout" element={<Layout><Login setAuth={setAuth} /></Layout>} />
      <Route path="register" element={<Layout><Register /></Layout>} />
      <Route path="packages" element={<Layout><Packages /></Layout>} />
      <Route path="add-package" element={<Layout><AddPackage /></Layout>} />
      <Route path="edit-package/:id" element={<Layout><EditPackage /></Layout>} />
      <Route path="bookings" element={<Layout><BookingsPage /></Layout>} />
      <Route path="add-booking" element={<Layout><AddBooking /></Layout>} />
    </Routes>
  );
}

export default RoutesList;
