// server/models/bookingModel.js
const db = require('../db/database');

class Booking {
  static getAll(callback) {
    db.all(`
      SELECT 
        bookings.*,
        users.username,
        users.email,
        event_types.name as event_type_name,
        packages.name as package_name,
        packages.price as package_price
      FROM bookings
      INNER JOIN users ON bookings.user_id = users.id
      INNER JOIN event_types ON bookings.event_type_id = event_types.id
      INNER JOIN packages ON bookings.package_id = packages.id
      ORDER BY bookings.start_time DESC
    `, callback);
  }

  static getByUserId(userId, callback) {
    db.all(`
      SELECT 
        bookings.*,
        event_types.name as event_type_name,
        packages.name as package_name,
        packages.price as package_price
      FROM bookings
      INNER JOIN event_types ON bookings.event_type_id = event_types.id
      INNER JOIN packages ON bookings.package_id = packages.id
      WHERE bookings.user_id = ?
      ORDER BY bookings.start_time DESC
    `, [userId], callback);
  }

  static getById(id, callback) {
    db.get(`
      SELECT 
        bookings.*,
        users.username,
        users.email,
        event_types.name as event_type_name,
        packages.name as package_name,
        packages.price as package_price
      FROM bookings
      INNER JOIN users ON bookings.user_id = users.id
      INNER JOIN event_types ON bookings.event_type_id = event_types.id
      INNER JOIN packages ON bookings.package_id = packages.id
      WHERE bookings.id = ?
    `, [id], callback);
  }

  static create(booking, callback) {
    const { user_id, event_type_id, package_id, start_time, end_time, location, note, phone } = booking;
    db.run(
      'INSERT INTO bookings (user_id, event_type_id, package_id, start_time, end_time, location, note, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [user_id, event_type_id, package_id, start_time, end_time, location, note || null, phone || null],
      function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { 
          id: this.lastID, 
          user_id, 
          event_type_id, 
          package_id, 
          start_time, 
          end_time, 
          location, 
          note, 
          phone,
          status: 'PENDING'
        });
      }
    );
  }

  static updateStatus(id, status, callback) {
    db.run('UPDATE bookings SET status=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', [status, id], function (err) {
      if (err) {
        return callback(err);
      }
      if (this.changes === 0) {
        return callback(null, null);
      }
      Booking.getById(id, callback);
    });
  }

  static cancel(id, userId, callback) {
    db.get('SELECT * FROM bookings WHERE id = ? AND user_id = ?', [id, userId], (err, booking) => {
      if (err) {
        return callback(err);
      }
      if (!booking) {
        return callback(null, null);
      }
      if (booking.status === 'COMPLETED') {
        return callback(new Error('Cannot cancel completed booking'));
      }
      Booking.updateStatus(id, 'CANCELLED', callback);
    });
  }

  static checkOverlap(startTime, endTime, excludeId = null, callback) {
    let query = `
      SELECT * FROM bookings 
      WHERE status NOT IN ('REJECTED', 'CANCELLED')
      AND (
        (start_time < ? AND end_time > ?) OR
        (start_time < ? AND end_time > ?) OR
        (start_time >= ? AND end_time <= ?)
      )
    `;
    const params = [endTime, startTime, startTime, endTime, startTime, endTime];
    
    if (excludeId) {
      query += ' AND id != ?';
      params.push(excludeId);
    }

    db.all(query, params, callback);
  }
}

module.exports = Booking;
