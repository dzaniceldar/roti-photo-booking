# Sažetak Refaktorisanja: Biblioteka → Photo Booking App

## Izvršene promjene

### Backend

#### Baza podataka
- ✅ Kreirana `config.js` sa SECRET_KEY
- ✅ Ažurirana `userScheme.js` - dodati email i role polja
- ✅ Kreirana `eventTypeScheme.js` - nova tabela za vrste fotografisanja
- ✅ Kreirana `packageScheme.js` - zamjena za books tabelu
- ✅ Kreirana `bookingScheme.js` - zamjena za reservations tabelu
- ✅ Kreirana `seedData.js` - seed podaci za event_types, packages i admin korisnika
- ✅ Ažuriran `database.js` - promijenjen naziv baze u `photo-booking.db`

#### Modeli
- ✅ Kreiran `eventTypeModel.js` - CRUD operacije za event types
- ✅ Kreiran `packageModel.js` - zamjena za bookModel (refaktorisan)
- ✅ Kreiran `bookingModel.js` - zamjena za reservationModel (refaktorisan)
- ✅ Ažuriran `userModel.js` - dodana podrška za email i role u tokenu

#### Kontroleri
- ✅ Kreiran `eventTypeController.js` - CRUD za event types
- ✅ Kreiran `packageController.js` - zamjena za bookController
- ✅ Kreiran `bookingController.js` - zamjena za reservationController sa validacijom preklapanja
- ✅ Ažuriran `authController.js` - dodan getMe endpoint

#### Rute
- ✅ Kreirana `routes/eventTypes.js` - rute za event types (public read, admin write)
- ✅ Kreirana `routes/packages.js` - zamjena za books.js (public read, admin write)
- ✅ Kreirana `routes/bookings.js` - zamjena za reservations.js sa novim endpointima
- ✅ Ažurirana `routes/auth.js` - dodan /me endpoint
- ✅ Ažuriran `server.js` - zamijenjene stare rute novim

#### Middleware
- ✅ Kreiran `adminMiddleware.js` - provjera admin role
- ✅ `authMiddleware.js` - ostao isti (već podržava role kroz token)

### Frontend

#### Stranice
- ✅ Kreirana `pages/packages/Packages.js` - zamjena za Books.js
- ✅ Kreirana `pages/packages/Package.js` - zamjena za Book.js
- ✅ Kreirana `pages/packages/addPackage.js` - zamjena za addBook.js
- ✅ Kreirana `pages/packages/editPackage.js` - zamjena za editBook.js
- ✅ Kreirana `pages/bookings/Bookings.js` - zamjena za Reservations.js sa admin/user view
- ✅ Kreirana `pages/bookings/addBooking.js` - kompleksna forma sa validacijom preklapanja
- ✅ Ažuriran `pages/dashboard/Dashboard.js` - statistike i predstojeći termini
- ✅ Ažuriran `pages/register/Register.js` - dodano email polje
- ✅ `pages/login/Login.js` - ostao isti (već podržava email kroz username field)

#### Komponente
- ✅ Ažuriran `components/header/Header.js` - promijenjeni linkovi (Paketi, Termini)
- ✅ Ažuriran `routes/routesList.js` - zamijenjene stare rute novim

### Dokumentacija
- ✅ Ažuriran `README.md` - kompletan vodič za Photo Booking App
- ✅ Kreiran `REFACTORING_SUMMARY.md` - ovaj dokument

## Mapiranje entiteta

| Stari entitet (Biblioteka) | Novi entitet (Photo Booking) |
|---------------------------|----------------------------|
| Books | Packages |
| Authors | Event Types |
| Reservations | Bookings |
| Members/Users | Users (sa role) |

## Ključne funkcionalnosti

### Implementirano
- ✅ Registracija i login sa email i role
- ✅ CRUD za Packages (admin only za write)
- ✅ CRUD za Event Types (admin only za write)
- ✅ Kreiranje booking-a sa validacijom preklapanja
- ✅ Pregled booking-a (moji za user, svi za admin)
- ✅ Promjena statusa booking-a (admin)
- ✅ Otkazivanje booking-a (user)
- ✅ Dashboard sa statistikama
- ✅ Automatsko izračunavanje end_time na osnovu duration_minutes

### Validacije
- ✅ Email format (frontend)
- ✅ Password minimalno (backend)
- ✅ start_time mora biti u budućnosti
- ✅ end_time > start_time
- ✅ Provjera preklapanja termina (backend)
- ✅ Provjera postojanja event_type i package

## API Endpoints

### Packages
- `GET /api/packages` - Lista paketa (auth required)
- `GET /api/packages/:id` - Detalji paketa (auth required)
- `POST /api/packages` - Kreiranje (admin only)
- `PUT /api/packages/:id` - Ažuriranje (admin only)
- `DELETE /api/packages/:id` - Brisanje (admin only)

### Event Types
- `GET /api/event-types` - Lista vrsta (auth required)
- `GET /api/event-types/:id` - Detalji vrste (auth required)
- `POST /api/event-types` - Kreiranje (admin only)
- `PUT /api/event-types/:id` - Ažuriranje (admin only)
- `DELETE /api/event-types/:id` - Brisanje (admin only)

### Bookings
- `GET /api/bookings` - Svi termini (admin only)
- `GET /api/bookings/my` - Moji termini (auth required)
- `GET /api/bookings/:id` - Detalji termina (auth required, owner or admin)
- `POST /api/bookings` - Kreiranje termina (auth required)
- `PATCH /api/bookings/:id/status` - Promjena statusa (admin only)
- `PATCH /api/bookings/:id/cancel` - Otkazivanje (auth required, owner)

## Statusi booking-a

- `PENDING` - Na čekanju (default)
- `CONFIRMED` - Potvrđen
- `REJECTED` - Odbijen
- `CANCELLED` - Otkazan
- `COMPLETED` - Završen

## Napomene

- Stare datoteke (books.js, reservations.js routes, models, controllers) su ostale u projektu ali se više ne koriste
- Mogu se obrisati ako želite, ali nisu u konfliktu sa novim kodom
- Baza podataka se sada zove `photo-booking.db` umjesto `books.db`
- Seed skripta kreira admin korisnika: username `admin`, password `admin123`

## Sljedeći koraci za pokretanje

1. Pokrenite migracije:
```bash
cd server
node db/schemes/userScheme.js
node db/schemes/eventTypeScheme.js
node db/schemes/packageScheme.js
node db/schemes/bookingScheme.js
node db/schemes/seedData.js
```

2. Pokrenite server:
```bash
npm start
```

3. Pokrenite client:
```bash
cd ../client
npm start
```

4. Login sa admin accountom ili registrujte novog korisnika
