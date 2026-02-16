import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Package from './Package';
import Cookies from 'js-cookie';

function Packages() {
  const [packages, setPackages] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/packages/public');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const checkAdmin = async () => {
      try {
        const authToken = Cookies.get('authData');
        const response = await fetch('/api/auth/me', {
          headers: { Authorization: `${authToken}` },
        });
        if (response.ok) {
          const user = await response.json();
          setIsAdmin(user.role === 'ADMIN');
        }
      } catch (error) {
        console.error('Error checking admin status:', error.message);
      }
    };

    fetchData();
    checkAdmin();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da ~elite obrisati ovaj paket?')) return;
    try {
      const authToken = Cookies.get('authData');
      const response = await fetch(`/api/packages/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `${authToken}` },
      });
      if (!response.ok) throw new Error('Failed to delete the package');
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id));
    } catch (error) {
      console.error('Error deleting package:', error.message);
      alert('Greaka pri brisanju. Samo admini mogu brisati pakete.');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-bold text-text">Foto paketi</h1>
          <p className="text-gray-500 mt-1">Pregledajte dostupne pakete za fotografisanje</p>
        </div>
        {isAdmin && (
          <Link to="/add-package" className="btn-primary inline-flex items-center gap-2 shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Dodaj paket
          </Link>
        )}
      </div>

      <div className="grid gap-6">
        {packages.map((pkg) => (
          <Package key={pkg.id} {...pkg} onDelete={isAdmin ? handleDelete : null} isAdmin={isAdmin} />
        ))}
      </div>

      {packages.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-gray-500">Nema dostupnih paketa.</p>
          {isAdmin && (
            <Link to="/add-package" className="btn-primary mt-4 inline-flex">
              Dodaj prvi paket
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default Packages;
