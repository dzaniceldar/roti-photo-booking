import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddBooking() {
  const [newBooking, setNewBooking] = useState({
    event_type_id: '',
    package_id: '',
    start_time: '',
    end_time: '',
    location: '',
    note: '',
    phone: '',
  });
  const [eventTypes, setEventTypes] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('authData');
        const [eventTypesRes, packagesRes] = await Promise.all([
          fetch('/api/event-types', { headers: { Authorization: authToken } }),
          fetch('/api/packages/public'),
        ]);
        if (!eventTypesRes.ok || !packagesRes.ok) throw new Error('Failed to fetch data');
        setEventTypes(await eventTypesRes.json());
        setPackages(await packagesRes.json());
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (newBooking.package_id && newBooking.start_time) {
      const selectedPkg = packages.find(p => p.id === parseInt(newBooking.package_id));
      if (selectedPkg) {
        setSelectedPackage(selectedPkg);
        const start = new Date(newBooking.start_time);
        const end = new Date(start.getTime() + selectedPkg.duration_minutes * 60000);
        setNewBooking(prev => ({ ...prev, end_time: end.toISOString().slice(0, 16) }));
      }
    }
  }, [newBooking.package_id, newBooking.start_time, packages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const start = new Date(newBooking.start_time);
    const end = new Date(newBooking.end_time);
    const now = new Date();

    if (start < now) {
      setError('Datum i vrijeme početka moraju biti u budućnosti');
      return;
    }
    if (end <= start) {
      setError('Vrijeme završetka mora biti nakon vremena početka');
      return;
    }

    try {
      const authToken = Cookies.get('authData');
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `${authToken}` },
        body: JSON.stringify({
          ...newBooking,
          event_type_id: parseInt(newBooking.event_type_id),
          package_id: parseInt(newBooking.package_id),
          start_time: new Date(newBooking.start_time).toISOString(),
          end_time: new Date(newBooking.end_time).toISOString(),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }
      navigate('/bookings');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Link to="/bookings" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2">
          ← Nazad na termine
        </Link>
      </div>
      <div className="card-elevated p-8">
        <h1 className="font-display text-3xl font-bold text-white mb-6">Zakaži termin</h1>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Vrsta fotografisanja</label>
            <select
              value={newBooking.event_type_id}
              onChange={(e) => setNewBooking({ ...newBooking, event_type_id: e.target.value })}
              className="input-field"
              required
            >
              <option value="" disabled>Odaberi vrstu</option>
              {eventTypes.map((et) => (
                <option key={et.id} value={et.id}>{et.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Paket</label>
            <select
              value={newBooking.package_id}
              onChange={(e) => setNewBooking({ ...newBooking, package_id: e.target.value })}
              className="input-field"
              required
            >
              <option value="" disabled>Odaberi paket</option>
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} – {pkg.price} KM ({pkg.duration_minutes} min)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Početak</label>
              <input
                type="datetime-local"
                value={newBooking.start_time}
                onChange={(e) => setNewBooking({ ...newBooking, start_time: e.target.value })}
                className="input-field"
                min={new Date().toISOString().slice(0, 16)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Završetak</label>
              <input
                type="datetime-local"
                value={newBooking.end_time}
                onChange={(e) => setNewBooking({ ...newBooking, end_time: e.target.value })}
                className="input-field"
                disabled={!selectedPackage}
                required
              />
              {selectedPackage && (
                <p className="text-xs text-gray-500 mt-1">
                  Auto: {selectedPackage.duration_minutes} min
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Lokacija</label>
            <input
              type="text"
              value={newBooking.location}
              onChange={(e) => setNewBooking({ ...newBooking, location: e.target.value })}
              className="input-field"
              placeholder="Adresa ili naziv lokacije"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Telefon (opcionalno)</label>
            <input
              type="tel"
              value={newBooking.phone}
              onChange={(e) => setNewBooking({ ...newBooking, phone: e.target.value })}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Napomena (opcionalno)</label>
            <textarea
              value={newBooking.note}
              onChange={(e) => setNewBooking({ ...newBooking, note: e.target.value })}
              className="input-field min-h-[80px]"
              rows="3"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary">Zakaži termin</button>
            <Link to="/bookings" className="btn-secondary">Odustani</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBooking;
