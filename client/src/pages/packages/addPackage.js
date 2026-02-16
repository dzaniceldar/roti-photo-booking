import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

function AddPackage() {
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    price: '',
    duration_minutes: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = Cookies.get('authData');
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `${authToken}` },
        body: JSON.stringify({
          ...newPackage,
          price: parseFloat(newPackage.price),
          duration_minutes: parseInt(newPackage.duration_minutes),
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add package');
      }
      navigate('/packages');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="mb-6">
        <Link to="/packages" className="text-gray-500 hover:text-accent transition-colors flex items-center gap-2">
          � Nazad na pakete
        </Link>
      </div>
      <div className="card-elevated p-8">
        <h1 className="font-display text-3xl font-bold text-white mb-6">Dodaj novi paket</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Naziv</label>
            <input
              type="text"
              value={newPackage.name}
              onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
              className="input-field"
              placeholder="npr. Portretna sesija"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Opis</label>
            <textarea
              value={newPackage.description}
              onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              className="input-field min-h-[120px]"
              placeholder="Detaljan opis paketa..."
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Cijena (KM)</label>
              <input
                type="number"
                step="0.01"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-2">Trajanje (minute)</label>
              <input
                type="number"
                value={newPackage.duration_minutes}
                onChange={(e) => setNewPackage({ ...newPackage, duration_minutes: e.target.value })}
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button type="submit" className="btn-primary">Dodaj paket</button>
            <Link to="/packages" className="btn-secondary">Odustani</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPackage;
