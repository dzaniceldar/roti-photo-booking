// server/models/packageModel.js
const db = require('../db/database');

class Package {
  static getAll(callback) {
    db.all('SELECT * FROM packages ORDER BY price', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM packages WHERE id = ?', [id], callback);
  }

  static create(pkg, callback) {
    const { name, description, price, duration_minutes } = pkg;
    db.run('INSERT INTO packages (name, description, price, duration_minutes) VALUES (?, ?, ?, ?)', 
      [name, description, price, duration_minutes], function (err) {
      callback(err, { id: this.lastID, name, description, price, duration_minutes });
    });
  }

  static update(id, updatedPackage, callback) {
    const { name, description, price, duration_minutes } = updatedPackage;
    db.run('UPDATE packages SET name=?, description=?, price=?, duration_minutes=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', 
      [name, description, price, duration_minutes, id], function (err) {
      if (err) {
        return callback(err);
      }
      if (this.changes === 0) {
        return callback(null, null);
      }
      callback(null, { id, name, description, price, duration_minutes });
    });
  }

  static delete(id, callback) {
    db.get('SELECT * FROM packages WHERE id = ?', [id], (err, pkg) => {
      if (err) {
        return callback(err);
      }
      if (!pkg) {
        return callback(null, null);
      }

      db.run('DELETE FROM packages WHERE id = ?', [id], function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id, name: pkg.name, description: pkg.description, price: pkg.price, duration_minutes: pkg.duration_minutes });
      });
    });
  }
}

module.exports = Package;
