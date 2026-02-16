// server/controllers/bookingController.js
const Booking = require('../models/bookingModel');
const Package = require('../models/packageModel');
const EventType = require('../models/eventTypeModel');

const bookingController = {
  getAllBookings: (req, res) => {
    Booking.getAll((err, bookings) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching bookings.' });
      }
      res.status(200).json(bookings);
    });
  },

  getMyBookings: (req, res) => {
    const userId = req.user.id;
    Booking.getByUserId(userId, (err, bookings) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching bookings.' });
      }
      res.status(200).json(bookings);
    });
  },

  getBookingById: (req, res) => {
    const bookingId = req.params.id;
    Booking.getById(bookingId, (err, booking) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching booking from the database.' });
      }
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      // Check if user owns the booking or is admin
      if (booking.user_id !== req.user.id && req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Access denied' });
      }
      res.json(booking);
    });
  },

  createBooking: (req, res) => {
    const { event_type_id, package_id, start_time, end_time, location, note, phone } = req.body;
    const user_id = req.user.id;

    // Validate required fields
    if (!event_type_id || !package_id || !start_time || !end_time || !location) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Validate dates
    const start = new Date(start_time);
    const end = new Date(end_time);
    const now = new Date();

    if (start < now) {
      return res.status(400).json({ error: 'Start time must be in the future.' });
    }

    if (end <= start) {
      return res.status(400).json({ error: 'End time must be after start time.' });
    }

    // Check if event type and package exist
    EventType.getById(event_type_id, (err, eventType) => {
      if (err || !eventType) {
        return res.status(400).json({ error: 'Invalid event type.' });
      }

      Package.getById(package_id, (err, pkg) => {
        if (err || !pkg) {
          return res.status(400).json({ error: 'Invalid package.' });
        }

        // Check for overlapping bookings
        Booking.checkOverlap(start_time, end_time, null, (err, overlaps) => {
          if (err) {
            return res.status(500).json({ error: 'Error checking booking availability.' });
          }

          if (overlaps && overlaps.length > 0) {
            return res.status(409).json({ error: 'Time slot is already booked. Please choose another time.' });
          }

          // Create booking
          const newBooking = {
            user_id,
            event_type_id,
            package_id,
            start_time,
            end_time,
            location,
            note: note || null,
            phone: phone || null
          };

          Booking.create(newBooking, (err, createdBooking) => {
            if (err) {
              return res.status(500).json({ error: 'Error creating booking.' });
            }
            res.status(201).json(createdBooking);
          });
        });
      });
    });
  },

  updateBookingStatus: (req, res) => {
    const bookingId = req.params.id;
    const { status } = req.body;

    const allowedStatuses = ['PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status.' });
    }

    Booking.updateStatus(bookingId, status, (err, updated) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating booking status.' });
      }
      if (!updated) {
        return res.status(404).json({ error: 'Booking not found' });
      }
      res.json(updated);
    });
  },

  cancelBooking: (req, res) => {
    const bookingId = req.params.id;
    const userId = req.user.id;

    Booking.cancel(bookingId, userId, (err, cancelled) => {
      if (err) {
        return res.status(500).json({ error: err.message || 'Error cancelling booking.' });
      }
      if (!cancelled) {
        return res.status(404).json({ error: 'Booking not found or cannot be cancelled.' });
      }
      res.json(cancelled);
    });
  },
};

module.exports = bookingController;
