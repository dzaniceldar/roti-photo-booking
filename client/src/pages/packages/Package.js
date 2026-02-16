import { Link } from 'react-router-dom';

function Package({ id, name, description, price, duration_minutes, onDelete, isAdmin }) {
  return (
    <div className="card p-6 sm:p-8 hover:shadow-glow transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
            {name}
          </h2>
          <div className="flex flex-wrap gap-4 mb-3">
            <span className="inline-flex items-center gap-1 text-accent font-semibold">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {price} KM
            </span>
            <span className="inline-flex items-center gap-1 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {duration_minutes} min
            </span>
          </div>
          <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
        {isAdmin && onDelete && (
          <div className="flex sm:flex-col gap-2 shrink-0">
            <Link
              to={`/edit-package/${id}`}
              className="btn-secondary text-sm py-2 inline-flex justify-center"
            >
              Uredi
            </Link>
            <button
              onClick={() => onDelete(id)}
              className="btn-danger text-sm py-2"
            >
              Obrisi
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Package;
