// server/controllers/packageController.js
const Package = require('../models/packageModel');

const packageController = {
  getAllPackages: (req, res) => {
    Package.getAll((err, packages) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching packages.' });
      }
      res.json(packages);
    });
  },

  getPackageById: (req, res) => {
    const packageId = req.params.id;
    Package.getById(packageId, (err, pkg) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching package from the database.' });
      }
      if (!pkg) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.json(pkg);
    });
  },

  createPackage: (req, res) => {
    const newPackage = req.body;
    Package.create(newPackage, (err, createdPackage) => {
      if (err) {
        return res.status(500).json({ error: 'Error adding package to the database.' });
      }
      res.status(201).json(createdPackage);
    });
  },

  updatePackage: (req, res) => {
    const packageId = req.params.id;
    const updatedPackage = req.body;
    Package.update(packageId, updatedPackage, (err, updated) => {
      if (err) {
        return res.status(500).json({ error: 'Error updating package in the database.' });
      }
      if (!updated) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.json(updated);
    });
  },

  deletePackage: (req, res) => {
    const packageId = req.params.id;
    Package.delete(packageId, (err, deletedPackage) => {
      if (err) {
        return res.status(500).json({ error: 'Error deleting package from the database.' });
      }
      if (!deletedPackage) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.json(deletedPackage);
    });
  },
};

module.exports = packageController;
