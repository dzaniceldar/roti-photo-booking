// server/models/eventTypeModel.js
const db = require('../db/database');

class EventType {
  static getAll(callback) {
    db.all('SELECT * FROM event_types ORDER BY name', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM event_types WHERE id = ?', [id], callback);
  }

  static create(eventType, callback) {
    const { name, description } = eventType;
    db.run('INSERT INTO event_types (name, description) VALUES (?, ?)', [name, description], function (err) {
      callback(err, { id: this.lastID, name, description });
    });
  }

  static update(id, updatedEventType, callback) {
    const { name, description } = updatedEventType;
    db.run('UPDATE event_types SET name=?, description=?, updated_at=CURRENT_TIMESTAMP WHERE id=?', [name, description, id], function (err) {
      if (err) {
        return callback(err);
      }
      if (this.changes === 0) {
        return callback(null, null);
      }
      callback(null, { id, name, description });
    });
  }

  static delete(id, callback) {
    db.get('SELECT * FROM event_types WHERE id = ?', [id], (err, eventType) => {
      if (err) {
        return callback(err);
      }
      if (!eventType) {
        return callback(null, null);
      }

      db.run('DELETE FROM event_types WHERE id = ?', [id], function (err) {
        if (err) {
          return callback(err);
        }
        callback(null, { id, name: eventType.name, description: eventType.description });
      });
    });
  }
}

module.exports = EventType;
