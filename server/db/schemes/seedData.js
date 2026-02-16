const db = require('../database');
const bcrypt = require('bcryptjs');

let completed = 0;
const totalOperations = 7 + 3 + 1; // 7 event types + 3 packages + 1 admin user

function checkComplete() {
  completed++;
  if (completed === totalOperations) {
    console.log('Seed data inserted successfully!');
    db.close();
  }
}

// Seed event types
const eventTypes = [
  { name: 'Rođendan', description: 'Fotografisanje rođendanskih proslava' },
  { name: 'Vjenčanje', description: 'Fotografisanje vjenčanja' },
  { name: 'Matura', description: 'Fotografisanje maturalnih proslava' },
  { name: 'Krštenje', description: 'Fotografisanje krštenja' },
  { name: 'Event', description: 'Fotografisanje različitih događaja' },
  { name: 'Korporativno', description: 'Korporativno fotografisanje' },
  { name: 'Portreti', description: 'Portretno fotografisanje' }
];

eventTypes.forEach((eventType) => {
  db.run(
    'INSERT OR IGNORE INTO event_types (name, description) VALUES (?, ?)',
    [eventType.name, eventType.description],
    checkComplete
  );
});

// Seed packages
const packages = [
  { name: 'Basic', description: 'Osnovni paket', price: 200.00, duration_minutes: 60 },
  { name: 'Standard', description: 'Standardni paket', price: 350.00, duration_minutes: 120 },
  { name: 'Premium', description: 'Premium paket', price: 500.00, duration_minutes: 180 }
];

packages.forEach((pkg) => {
  db.run(
    'INSERT OR IGNORE INTO packages (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)',
    [pkg.name, pkg.description, pkg.price, pkg.duration_minutes],
    checkComplete
  );
});

// Create admin user (password: admin123)
const hashedPassword = bcrypt.hashSync('admin123', 10);
db.run(
  'INSERT OR IGNORE INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
  ['admin', 'admin@photoapp.com', hashedPassword, 'ADMIN'],
  checkComplete
);
