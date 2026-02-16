// server/server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const { initDb } = require('./db/database');

const app = express();
const port = 3001;

const packageRoutes = require('./routes/packages');
const bookingRoutes = require('./routes/bookings');
const eventTypeRoutes = require('./routes/eventTypes');
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());

const clientBuildPath = path.join(__dirname, '..', 'client', 'build');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

// Javni cjenovnik - mora biti prije /api/packages da ne zahvati :id
const packageController = require('./controllers/packageController');
app.get('/api/packages/public', packageController.getAllPackages);

app.use('/api/packages', packageRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/event-types', eventTypeRoutes);
app.use('/api/auth', authRoutes);

// Serve client build (SPA) for non-API routes
app.use(express.static(clientBuildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Init database (tables + seed) then start server
initDb((err) => {
  if (err) {
    console.error('Database init error:', err);
    process.exit(1);
  }
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
