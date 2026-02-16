import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm_password) {
      setError('Lozinke se ne podudaraju.');
      return;
    }
    if (formData.password.length < 6) {
      setError('Lozinka mora imati najmanje 6 znakova.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || 'Registracija nije uspjela.');
      }

      navigate('/login');
    } catch (err) {
      const isNetworkError = err.message === 'Failed to fetch' || err.message.includes('NetworkError');
      setError(isNetworkError
        ? 'Nema konekcije sa serverom. Pokreni backend: npm start u folderu server.'
        : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in">
      <div className="card-elevated p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2">
            Kreiraj račun
          </h1>
          <p className="text-gray-500">Registrujte se za besplatni pristup</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Korisničko ime</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Unesite korisničko ime"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Unesite email adresu"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Lozinka</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimalno 6 znakova"
              className="input-field"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Potvrdi lozinku</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Ponovite lozinku"
              className="input-field"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registracija...' : 'Registruj se'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500 text-sm">
          Već imate račun?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover font-medium">
            Prijavite se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
