const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/adminMiddleware');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.use(authenticateToken); // Apply middleware to all routes below this line

// Admin: GET all bookings (must be before /:id)
router.get('/', requireAdmin, bookingController.getAllBookings);

// User: my bookings
router.get('/my', bookingController.getMyBookings);

router.post('/', bookingController.createBooking);
router.get('/:id', bookingController.getBookingById);
router.patch('/:id/cancel', bookingController.cancelBooking);
router.patch('/:id/status', requireAdmin, bookingController.updateBookingStatus);

module.exports = router;
