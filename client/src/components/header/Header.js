import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Header({ auth, setAuth }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false);
    Cookies.remove('authData');
    navigate('/login');
  };

  return (
    <header 
      className="sticky top-0 z-50 backdrop-blur-xl bg-canvas/80 border-b border-white/5"
      style={{ background: 'rgba(15,20,25,0.95)', borderBottom: '1px solid rgba(255,255,255,0.15)', color: '#e5e7eb' }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group" style={{ color: 'inherit', textDecoration: 'none' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#d4a853' }}>Roti</span><span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Photo</span>
          </Link>

          <div className="flex items-center gap-6">
            {auth && (
              <div className="hidden sm:flex items-center gap-1">
                <Link to="/packages" className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Paketi
                </Link>
                <Link to="/bookings" className="px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200">
                  Termini
                </Link>
              </div>
            )}

            <div className="flex items-center gap-3">
              {!auth ? (
                <>
                  <Link to="/login" className="btn-ghost" style={{ color: '#9ca3af', padding: '8px 16px' }}>Prijavi se</Link>
                  <Link to="/register" className="btn-primary" style={{ background: '#d4a853', color: '#0f1419', padding: '8px 16px', borderRadius: '8px', fontWeight: 600 }}>Registracija</Link>
                </>
              ) : (
                <button onClick={handleLogout} className="btn-ghost flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Odjavi se
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
