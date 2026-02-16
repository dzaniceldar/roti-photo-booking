// server/db/database.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, 'photo_booking.db');
const db = new sqlite3.Database(dbPath);

const ADMIN_SEED = {
  username: 'admin',
  email: 'admin@photobooking.ba',
  password: 'admin123',
  role: 'ADMIN',
};

function initDb(callback) {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS packages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        duration_minutes INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS event_types (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'USER'
      )
    `);
    db.run(`
      CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
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

    db.get('SELECT COUNT(*) as count FROM users WHERE role = ?', ['ADMIN'], (err, row) => {
      if (err) return callback(err);
      if (row.count === 0) {
        bcrypt.hash(ADMIN_SEED.password, 10, (hashErr, hashedPassword) => {
          if (hashErr) return callback(hashErr);
          db.run(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [ADMIN_SEED.username, ADMIN_SEED.email, hashedPassword, ADMIN_SEED.role],
            function (runErr) {
              if (runErr) return callback(runErr);
              console.log('Seed: Admin korisnik kreiran (admin / admin123)');
              seedEventTypes();
            }
          );
        });
      } else {
        seedEventTypes();
      }
    });

    function seedEventTypes() {
    db.get('SELECT COUNT(*) as count FROM event_types', (err, row) => {
      if (err) return callback(err);
      if (row.count === 0) {
        const seedEventTypes = [
          { name: 'Portretna fotografija', description: 'Individualni portreti u studiju ili na lokaciji.' },
          { name: 'Porodicna fotografija', description: 'Porodicne sesije i grupne fotografije.' },
          { name: 'Vjencanje', description: 'Fotografiranje vjencanja, ceremonija i svadbe.' },
          { name: 'Produktna fotografija', description: 'Fotografija proizvoda za web shop i kataloge.' },
          { name: 'Korporativna fotografija', description: 'Poslovni dogadaji, konferencije, tim bilding.' },
          { name: 'Gradjansko vjencanje', description: 'Manje ceremonije i intimne proslave.' },
        ];
        const stmtEt = db.prepare('INSERT INTO event_types (name, description) VALUES (?, ?)');
        seedEventTypes.forEach((et) => stmtEt.run(et.name, et.description));
        stmtEt.finalize();
        console.log('Seed: ' + seedEventTypes.length + ' vrsta fotografisanja dodano.');
      }

      db.get('SELECT COUNT(*) as count FROM packages', (err2, row2) => {
        if (err2) return callback(err2);
        if (row2.count === 0) {
          const seedPackages = [
            { name: 'Portretna sesija', description: 'Profesionalna portretna fotografija u studiju ili na lokaciji. Ukljucuje obradenu fotografiju u visokoj rezoluciji.', price: 80, duration_minutes: 60 },
            { name: 'Porodicna sesija', description: 'Porodicne fotografije u prirodi ili studiju. Idealno za porodicne albume i darove.', price: 120, duration_minutes: 90 },
            { name: 'Vjencanje - Osnovni', description: 'Fotografiranje vjencanja do 6 sati. Obrada i isporuka digitalnih fotografija.', price: 500, duration_minutes: 360 },
            { name: 'Vjencanje - Komplet', description: 'Cjelodnevno fotografiranje vjencanja, priprema, ceremonija i svadba. Sve fotografije obrađene.', price: 900, duration_minutes: 600 },
            { name: 'Produktna fotografija', description: 'Profesionalna fotografija proizvoda za web shop ili katalog. Do 20 proizvoda.', price: 150, duration_minutes: 120 },
            { name: 'Korporativni event', description: 'Fotografiranje poslovnih dogadaja, konferencija i tim bildinga.', price: 250, duration_minutes: 180 },
          ];
          const stmt = db.prepare('INSERT INTO packages (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)');
          seedPackages.forEach((p) => stmt.run(p.name, p.description, p.price, p.duration_minutes));
          stmt.finalize(() => {
            console.log('Seed: ' + seedPackages.length + ' paketa dodano u cjenovnik.');
            callback(null);
          });
        } else {
          callback(null);
        }
      });
    });
    }
  });
}

module.exports = db;
module.exports.initDb = initDb;
