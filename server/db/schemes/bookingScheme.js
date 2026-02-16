const db = require('../database');

db.run(`
  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    event_type_id INTEGER NOT NULL,
    package_id INTEGER NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    location TEXT NOT NULL,
    note TEXT,
    phone TEXT,
    status TEXT DEFAULT 'PENDING',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (event_type_id) REFERENCES event_types(id),
    FOREIGN KEY (package_id) REFERENCES packages(id)
  )
`);

db.close();
