import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ setAuth }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Pogresno korisnicko ime ili lozinka');

      const data = await response.json();
      document.cookie = `authData=${data.user.token}; path=/;`;
      setAuth(data.user);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Prijava nije uspjela.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto" style={{ padding: '2rem 1rem', maxWidth: '28rem', margin: '0 auto', opacity: 1 }}>
      <div 
        className="card-elevated p-8 sm:p-10"
        style={{ 
          background: 'rgba(36,52,71,0.98)', 
          border: '1px solid rgba(255,255,255,0.2)', 
          borderRadius: '1rem', 
          padding: '2rem',
          color: '#e5e7eb'
        }}
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-2" style={{ color: '#fff', marginBottom: '0.5rem' }}>
            Dobrodosli nazad
          </h1>
          <p style={{ color: '#9ca3af' }}>Prijavite se na svoj racun</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label style={{ display: 'block', color: '#9ca3af', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Korisnicko ime ili email
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Unesite korisnicko ime ili email"
              className="input-field"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#e5e7eb' }}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', color: '#9ca3af', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
              Lozinka
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Unesite lozinku"
              className="input-field"
              style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: '#e5e7eb' }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ width: '100%', padding: '16px', background: '#d4a853', color: '#0f1419', fontWeight: 600, borderRadius: '12px', border: 'none', cursor: 'pointer' }}
          >
            {loading ? 'Prijavljivanje...' : 'Prijavi se'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          Nemate racun?{' '}
          <Link to="/register" style={{ color: '#d4a853', fontWeight: 500 }}>
            Registrujte se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
