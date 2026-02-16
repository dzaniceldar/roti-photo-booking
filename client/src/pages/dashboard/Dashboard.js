import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop', alt: 'Portretna fotografija', category: 'Portreti' },
  { id: 2, src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop', alt: 'Vjencanje', category: 'Vjencanja' },
  { id: 3, src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop', alt: 'Proizvodi', category: 'Produktna' },
  { id: 4, src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop', alt: 'Portret', category: 'Portreti' },
  { id: 5, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop', alt: 'Sesija', category: 'Portreti' },
  { id: 6, src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop', alt: 'Portretna sesija', category: 'Portreti' },
];

function Dashboard({ auth }) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch('/api/packages/public');
        if (res.ok) setPackages(await res.json());
      } catch (err) {
        console.error(err);
      }
    };
    fetchPackages();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero sekcija */}
      <section className="relative overflow-hidden rounded-3xl mb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200')] bg-cover bg-center opacity-30" />
        <div className="relative px-8 py-20 sm:py-28 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Zakazite fotografsku sesiju
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Profesionalna fotografija za sve prilike - portreti, vjencanja, produktna fotografija i vise.
          </p>
          <Link to={auth ? '/add-booking' : '/login'} className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Zakazi termin
          </Link>
        </div>
      </section>

      {/* O kompaniji */}
      <section className="mb-20">
        <div className="card p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">O nama</h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Nasa fotografija studio je posvecen hvatanju trenutaka koji ostaju zauvijek. S vise od 10 godina iskustva u industriji, specializirani smo za portretnu fotografiju, vjencanja, produktnu fotografiju i korporativne dogadaje.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Koristimo najmoderniju opremu i pristupamo svakom projektu s individualnom paznjom. Vase zadovoljstvo je nas prioritet - od prvog kontakta do zavrsetka projekta.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/packages" className="btn-secondary">Pogledaj pakete</Link>
                {auth && <Link to="/bookings" className="btn-ghost">Moji termini</Link>}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-white/5">
                <img src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=500&h=500&fit=crop" alt="Fotograf" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Galerija radova */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Nasi radovi</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Pregledajte neke od nasih najboljih fotografija iz razlicitih kategorija</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden card hover:shadow-glow transition-all duration-300">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform">
                <span className="text-accent text-sm font-medium">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cjenovnik */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Cjenovnik</h2>
          <p className="text-gray-500 max-w-xl mx-auto">Pregledajte nase pakete i odaberite onaj koji vam najbolje odgovara</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <div key={pkg.id} className="card p-6 hover:border-accent/30 transition-colors">
                <h3 className="font-display text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-accent text-2xl font-bold mb-3">{pkg.price} KM</p>
                <p className="text-gray-500 text-sm mb-4">{pkg.duration_minutes} minuta</p>
                <p className="text-gray-400 text-sm mb-6 h-12 overflow-hidden">{pkg.description}</p>
                <Link to={auth ? '/add-booking' : '/login'} className="btn-secondary w-full text-center text-sm py-2">
                  Zakazi
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full card p-12 text-center">
              <p className="text-gray-500 mb-4">Cjenovnik ce uskoro biti dostupan.</p>
              <Link to="/login" className="btn-primary">Prijavi se za vise informacija</Link>
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <Link to="/packages" className="text-accent hover:text-accent-hover font-medium">Pogledaj sve pakete</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="card p-8 sm:p-12 text-center bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Spremni za sesiju?</h2>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Zakazite termin u nekoliko klikova. Kontaktirajte nas ako imate pitanja ili zelite specifican paket.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={auth ? '/add-booking' : '/login'} className="btn-primary inline-flex items-center justify-center gap-2">
            {auth ? 'Zakazi termin' : 'Prijavi se'}
          </Link>
          <Link to="/packages" className="btn-secondary inline-flex">Cjenovnik</Link>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
