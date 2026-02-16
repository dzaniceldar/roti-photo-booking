import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = Cookies.get('authData');
    if (!authToken) return;

    const loadData = async () => {
      try {
        const meRes = await fetch('/api/auth/me', { headers: { Authorization: authToken } });
        const userData = meRes.ok ? await meRes.json() : null;
        if (userData) {
          setUser(userData);
          setIsAdmin(userData.role === 'ADMIN');
        }

        const endpoint = userData?.role === 'ADMIN' ? '/api/bookings' : '/api/bookings/my';
        const bookingsRes = await fetch(endpoint, { headers: { Authorization: authToken } });
        if (bookingsRes.ok) {
          const data = await bookingsRes.json();
          setBookings(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error loading bookings:', error.message);
      }
    };
    loadData();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const authToken = Cookies.get('authData');
      const response = await fetch(`/api/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', Authorization: `${authToken}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) throw new Error('Failed to update');
      const updatedBooking = await response.json();
      setBookings(bookings.map(b => b.id === bookingId ? updatedBooking : b));
    } catch (error) {
      console.error(error.message);
      alert('Greška pri ažuriranju statusa');
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Da li ste sigurni da želite otkazati ovaj termin?')) return;
    try {
      const authToken = Cookies.get('authData');
      const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: { Authorization: `${authToken}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to cancel');
      }
      const cancelled = await response.json();
      setBookings(bookings.map(b => b.id === bookingId ? cancelled : b));
      alert('Termin je otkazan');
    } catch (error) {
      alert(error.message);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'CONFIRMED': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'PENDING': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'REJECTED': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'CANCELLED': return 'bg-gray-500/20 text-white-light border-gray-500/30';
      case 'COMPLETED': return 'bg-accent/20 text-accent border-accent/30';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-white">
            {isAdmin ? 'Svi termini' : 'Moji termini'}
          </h1>
          <p className="text-white-light mt-1">
            {isAdmin ? 'Upravljanje svim rezervacijama' : 'Vaši zakazani termini'}
          </p>
        </div>
        {!isAdmin && (
          <Link to="/add-booking" className="btn-primary inline-flex items-center gap-2 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Zakaži termin
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="card p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              <div className="flex-1">
                <h2 className="font-display text-xl font-bold text-white mb-3">
                  {booking.event_type_name} – {booking.package_name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-400">
                  <p className="flex items-center gap-2">
                    <span className="text-white-light w-24">Datum:</span>
                    {new Date(booking.start_time).toLocaleString('bs-BA')} – {new Date(booking.end_time).toLocaleString('bs-BA')}
                  </p>
                  <p><span className="text-white-light">Lokacija:</span> {booking.location}</p>
                  {booking.phone && <p><span className="text-white-light">Telefon:</span> {booking.phone}</p>}
                  {isAdmin && <p><span className="text-white-light">Korisnik:</span> {booking.username} ({booking.email})</p>}
                </div>
                {booking.note && (
                  <p className="mt-2 text-sm text-white-light italic">Napomena: {booking.note}</p>
                )}
                <p className="mt-2 text-accent font-semibold">{booking.package_price} KM</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col items-start gap-3 shrink-0">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-medium border ${getStatusStyle(booking.status)}`}>
                  {booking.status}
                </span>
                {isAdmin && (
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="input-field text-sm py-2 w-full sm:w-auto"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="REJECTED">REJECTED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                )}
                {!isAdmin && booking.status !== 'COMPLETED' && booking.status !== 'CANCELLED' && (
                  <button onClick={() => handleCancel(booking.id)} className="btn-danger w-full sm:w-auto">
                    Otkaži
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-white-light mb-4">Nema zakazanih termina.</p>
          {!isAdmin && (
            <Link to="/add-booking" className="btn-primary inline-flex">
              Zakaži prvi termin
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Bookings;
