const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const requireAdmin = require('../middlewares/adminMiddleware');
const packageController = require('../controllers/packageController');

const router = express.Router();

// Public - cjenovnik vidljiv svima (za landing stranicu)
router.get('/public', packageController.getAllPackages);

// Authenticated routes
router.get('/', authenticateToken, packageController.getAllPackages);
router.get('/:id', authenticateToken, packageController.getPackageById);

// Admin-only routes
router.post('/', authenticateToken, requireAdmin, packageController.createPackage);
router.put('/:id', authenticateToken, requireAdmin, packageController.updatePackage);
router.delete('/:id', authenticateToken, requireAdmin, packageController.deletePackage);

module.exports = router;
