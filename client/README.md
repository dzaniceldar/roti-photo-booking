📸 Roti Photo — Online Photography Booking System
📖 Overview
Roti Photo is a full-stack web application for managing online photography session reservations. The system allows users to register, log in, browse photography packages, select event types, and book photo sessions online.
Users can create reservations by choosing available packages, event types, and preferred dates. All reservations are stored in the database and managed through a secured backend system. The platform is designed to simplify communication between photographers and clients and improve booking efficiency.
🚀 Features
🔐 Authentication
User registration and login using JWT
Password encryption with bcrypt
Token verification on each protected request
Secure user sessions
📅 Reservation Management
Create photography reservations
Select event type and package
Choose preferred date and time
View personal reservations
Update and cancel reservations
📦 Package Management
CRUD operations for photography packages
Package includes name, description, and price
Managed via backend controllers
🎉 Event Types
Manage different photography event categories
Examples: weddings, portraits, product photography
Full CRUD support
👤 User Management
User profiles stored securely
Each reservation linked to a specific user
Access restricted to authenticated users
📄 API Documentation
Swagger UI support for API testing and documentation
🛠️ Tech Stack
Layer	Technology
Frontend	React, Tailwind CSS
Backend	Node.js, Express
Database	SQLite
Auth	JWT, bcrypt
Docs	Swagger
🏗️ Architecture
Client–Server Model
Frontend runs on port 3000
Backend runs on port 3001
Communication via REST API
CORS enabled
Authentication Flow
User registers or logs in
Server generates JWT token
Client stores token
Token is sent with each protected request
Server verifies token using middleware
Protected Routes
Reservation, package, and event routes
Secured using authentication middleware
User-specific data access
Database
SQLite database file: photo-booking.db
Accessed using sqlite3 driver
Tables initialized via schema files
📁 Project Structure
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                 # Express backend
│   ├── controllers/       # auth, booking, package, event
│   ├── middlewares/       # authMiddleware
│   ├── models/            # User, Booking, Package, Event
│   ├── routes/
│   ├── db/
│   │   └── database.js
│   ├── config.js
│   ├── server.js
│   └── package.json
│
└── README.md
⚙️ Installation & Run Guide
Prerequisites
Node.js v16+
npm
1️⃣ Backend Setup
cd server
npm install
Start Server
npm start
Backend runs on:
http://localhost:3001
2️⃣ Frontend Setup
cd client
npm install
npm start
Frontend runs on:
http://localhost:3000
💾 Database
Engine
SQLite
Database File
server/photo-booking.db
Tables
Table	Description
users	User accounts
bookings	Photography reservations
packages	Photography packages
event_types	Photography event categories
Each reservation contains:
User ID
Package ID
Event Type ID
Date and time
🌐 API Overview
Base URL:
http://localhost:3001/api
Authorization header:
Authorization: <JWT>
Main Endpoints
Method	Route	Auth	Description
POST	/auth/register	No	Register
POST	/auth/login	No	Login
GET	/bookings	Yes	Get reservations
POST	/bookings	Yes	Create reservation
PUT	/bookings/:id	Yes	Update reservation
DELETE	/bookings/:id	Yes	Delete reservation
GET	/packages	Yes	Get packages
POST	/packages	Yes	Create package
GET	/events	Yes	Get event types
Swagger UI
http://localhost:3001/api/docs
🔐 Authentication
Passwords hashed using bcrypt
JWT tokens used for authorization
Tokens validated by middleware
Unauthorized access blocked
🔄 System Workflow
Booking Process
User logs in
Selects package and event type
Chooses date
Creates reservation
Data stored in database
Reservation Management
Users can edit or cancel bookings
Ownership is verified on backend
🧑‍💻 Developer Guide
Add New Feature
Create model
Create controller
Create routes
Register routes in server.js
Connect frontend
Add New Field
Update database schema
Update model
Update controller
Update frontend form
🔮 Future Improvements
📆 Calendar view for bookings
💳 Online payments
📷 Photo gallery
📩 Email notifications
👨‍💼 Admin dashboard
📱 Mobile optimization
👨‍🎓 Author
Roti Photo is a student project developed for educational purposes.
It demonstrates:
Full-stack web development
REST API design
Authentication
Database integration
Modern UI design