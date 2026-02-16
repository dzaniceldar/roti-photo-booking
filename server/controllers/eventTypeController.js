// server/controllers/eventTypeController.js
const EventType = require('../models/eventTypeModel');

const eventTypeController = {
  getAllEventTypes: (req, res) => {
    EventType.getAll((err, eventTypes) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching event types.' });
      }
      res.json(eventTypes);
    });
  },

  getEventTypeById: (req, res) => {
    const eventTypeId = req.params.id;
    EventType.getById(eventTypeId, (err, eventType) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching event type from the database.' });
      }
      if (!eventType) {
        return res.status(404).json({ error: 'Event type not found' });
      }
      res.json(eventType);
    });
  },

  createEventType: (req, res) => {
    const newEventType = req.body;
    EventType.create(newEventType, (err, createdEventType) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding event type to the database.' });
      }
      res.status(201).json(createdEventType);
    });
  },

  updateEventType: (req, res) => {
    const eventTypeId = req.params.id;
    const updatedEventType = req.body;
    EventType.update(eventTypeId, updatedEventType, (err, updated) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating event type in the database.' });
      }
      if (!updated) {
        return res.status(404).json({ error: 'Event type not found' });
      }
      res.json(updated);
    });
  },

  deleteEventType: (req, res) => {
    const eventTypeId = req.params.id;
    EventType.delete(eventTypeId, (err, deletedEventType) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting event type from the database.' });
      }
      if (!deletedEventType) {
        return res.status(404).json({ error: 'Event type not found' });
      }
      res.json(deletedEventType);
    });
  },
};

module.exports = eventTypeController;
