const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/adminMiddleware');
const eventTypeController = require('../controllers/eventTypeController');

const router = express.Router();

// Public routes - anyone authenticated can view event types
router.get('/', authenticateToken, eventTypeController.getAllEventTypes);
router.get('/:id', authenticateToken, eventTypeController.getEventTypeById);

// Admin-only routes
router.post('/', authenticateToken, requireAdmin, eventTypeController.createEventType);
router.put('/:id', authenticateToken, requireAdmin, eventTypeController.updateEventType);
router.delete('/:id', authenticateToken, requireAdmin, eventTypeController.deleteEventType);

module.exports = router;
