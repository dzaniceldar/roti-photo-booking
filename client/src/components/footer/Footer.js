import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer 
      className="mt-auto border-t border-white/5 bg-canvas/50 backdrop-blur-sm"
      style={{ borderTop: '1px solid rgba(255,255,255,0.15)', background: 'rgba(15,20,25,0.8)', color: '#e5e7eb' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block">
              <span className="text-xl font-display font-bold text-accent">Roti</span><span className="text-xl font-display font-bold text-white/90">Photo</span>
            </Link>
            <p className="mt-4 text-gray-500 max-w-md leading-relaxed">
              Profesionalna rezervacija fotografskih sesija. Zakažite termin jednostavno i brzo.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Navigacija</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-500 hover:text-accent transition-colors">Pocetna</Link></li>
              <li><Link to="/packages" className="text-gray-500 hover:text-accent transition-colors">Paketi</Link></li>
              <li><Link to="/bookings" className="text-gray-500 hover:text-accent transition-colors">Termini</Link></li>
              <li><Link to="/login" className="text-gray-500 hover:text-accent transition-colors">Prijava</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Kontakt</h4>
            <p className="text-gray-500">info@photobooking.ba</p>
            <p className="text-gray-500 mt-1">+387 33 123 456</p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} RotiPhoto. Sva prava zadrzana.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
