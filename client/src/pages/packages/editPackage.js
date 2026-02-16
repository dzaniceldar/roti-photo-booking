import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function EditPackage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editedPackage, setEditedPackage] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = Cookies.get('authData');
        const response = await fetch(`/api/packages/${id}`, {
          headers: { Authorization: `${authToken}` },
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEditedPackage({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          duration_minutes: data.duration_minutes.toString(),
        });
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get('authData');
      const response = await fetch(`/api/packages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `${authToken}` },
        body: JSON.stringify({
          name: editedPackage.name,
          description: editedPackage.description,
          price: parseFloat(editedPackage.price),
          duration_minutes: parseInt(editedPackage.duration_minutes),
        }),
      });
      if (!response.ok) throw new Error('Failed to update');
      navigate('/packages');
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-pulse text-gray-500">Učitavanje...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Link to="/packages" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2">
          ← Nazad na pakete
        </Link>
      </div>
      <div className="card-elevated p-8">
        <h1 className="font-display text-3xl font-bold text-white mb-6">Uredi paket</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Naziv</label>
            <input
              type="text"
              value={editedPackage.name}
              onChange={(e) => setEditedPackage({ ...editedPackage, name: e.target.value })}
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Opis</label>
            <textarea
              value={editedPackage.description}
              onChange={(e) => setEditedPackage({ ...editedPackage, description: e.target.value })}
              className="input-field min-h-[120px]"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Cijena (KM)</label>
              <input
                type="number"
                step="0.01"
                value={editedPackage.price}
                onChange={(e) => setEditedPackage({ ...editedPackage, price: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Trajanje (minute)</label>
              <input
                type="number"
                value={editedPackage.duration_minutes}
                onChange={(e) => setEditedPackage({ ...editedPackage, duration_minutes: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary">Spremi promjene</button>
            <Link to="/packages" className="btn-secondary">Odustani</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPackage;
