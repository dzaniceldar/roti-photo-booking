# Photo Booking Application

Aplikacija za zakazivanje termina fotografisanja. Korisnici se registruju i loguju, nakon čega mogu zakazati termin fotografisanja (rođendan, vjenčanje, matura, krštenje, event, korporativno, portreti). Admin može upravljati terminima, odobravati/odbijati, vidjeti kalendar/pregled, mijenjati status i upravljati paketima usluga.

## Tehnologije

* REACT.JS
* NODE.JS (EXPRESS LIBRARY)
* SQLITE
* GIT
* JWT Authentication
* Tailwind CSS

## Struktura projekta

Projekat se sastoji od dva foldera:

* `client` - React frontend aplikacija
* `server` - Node.js backend API sa Express bibliotekom

## Instalacija i pokretanje

### Backend (Server)

1. Uđite u `server` folder:
```bash
cd server
```

2. Instalirajte dependencies:
```bash
npm install
```

3. Kreirajte bazu podataka i tabele (migracije):
```bash
node db/schemes/userScheme.js
node db/schemes/eventTypeScheme.js
node db/schemes/packageScheme.js
node db/schemes/bookingScheme.js
```

4. Popunite bazu podataka seed podacima:
```bash
node db/schemes/seedData.js
```

5. Pokrenite server:
```bash
npm start
```

Server će raditi na `http://localhost:3001`

### Frontend (Client)

1. Uđite u `client` folder:
```bash
cd client
```

2. Instalirajte dependencies:
```bash
npm install
```

3. Pokrenite aplikaciju:
```bash
npm start
```

Aplikacija će raditi na `http://localhost:3000`

## API Dokumentacija

API dokumentacija je dostupna na: `http://localhost:3001/api/docs`

## Autentikacija

Aplikacija koristi JWT token autentikaciju. Nakon registracije ili logina, token se čuva u cookie-u.

### Default Admin Account

Nakon pokretanja seed skripte, kreiran je admin korisnik:
- Username: `admin`
- Email: `admin@photoapp.com`
- Password: `admin123`
- Role: `ADMIN`

## API Rute

### Autentikacija
- `POST /api/auth/register` - Registracija korisnika
- `POST /api/auth/login` - Login korisnika
- `GET /api/auth/me` - Dobijanje trenutnog korisnika (zahtijeva auth)
- `POST /api/auth/verify-token` - Verifikacija tokena

### Paketi (Packages)
- `GET /api/packages` - Lista svih paketa (zahtijeva auth)
- `GET /api/packages/:id` - Detalji paketa (zahtijeva auth)
- `POST /api/packages` - Kreiranje paketa (zahtijeva admin)
- `PUT /api/packages/:id` - Ažuriranje paketa (zahtijeva admin)
- `DELETE /api/packages/:id` - Brisanje paketa (zahtijeva admin)

### Vrste fotografisanja (Event Types)
- `GET /api/event-types` - Lista svih vrsta fotografisanja (zahtijeva auth)
- `GET /api/event-types/:id` - Detalji vrste (zahtijeva auth)
- `POST /api/event-types` - Kreiranje vrste (zahtijeva admin)
- `PUT /api/event-types/:id` - Ažuriranje vrste (zahtijeva admin)
- `DELETE /api/event-types/:id` - Brisanje vrste (zahtijeva admin)

### Termini (Bookings)
- `GET /api/bookings` - Lista svih termina (zahtijeva admin)
- `GET /api/bookings/my` - Lista mojih termina (zahtijeva auth)
- `GET /api/bookings/:id` - Detalji termina (zahtijeva auth)
- `POST /api/bookings` - Kreiranje termina (zahtijeva auth)
- `PATCH /api/bookings/:id/status` - Promjena statusa termina (zahtijeva admin)
- `PATCH /api/bookings/:id/cancel` - Otkazivanje termina (zahtijeva auth, vlasnik termina)

## Statusi termina

- `PENDING` - Na čekanju (default)
- `CONFIRMED` - Potvrđen
- `REJECTED` - Odbijen
- `CANCELLED` - Otkazan
- `COMPLETED` - Završen

## Validacije

### Kreiranje termina
- `start_time` mora biti u budućnosti
- `end_time` mora biti nakon `start_time`
- `location` je obavezno polje
- `event_type_id` i `package_id` moraju postojati u bazi
- Sistem provjerava preklapanje termina - ne dozvoljava preklapanje sa postojećim terminima (osim REJECTED ili CANCELLED)

### Registracija
- `username` je obavezno i mora biti jedinstveno
- `email` je obavezno i mora biti jedinstveno
- `password` je obavezno

## Primjer JSON payload-a za kreiranje termina

```json
{
  "event_type_id": 1,
  "package_id": 1,
  "start_time": "2024-03-15T10:00:00Z",
  "end_time": "2024-03-15T11:00:00Z",
  "location": "Studio Foto, Sarajevo",
  "note": "Posebni zahtjevi za fotografisanje",
  "phone": "+38761123456"
}
```

## Frontend Rute

- `/` - Dashboard (zahtijeva auth)
- `/login` - Login stranica
- `/register` - Registracija
- `/packages` - Lista paketa
- `/add-package` - Dodavanje paketa (admin only)
- `/edit-package/:id` - Uređivanje paketa (admin only)
- `/bookings` - Lista termina (moji termini za korisnike, svi za admin)
- `/add-booking` - Zakazivanje novog termina

## Funkcionalnosti

### Korisnik (USER)
- Registracija i login
- Pregled dostupnih paketa
- Zakazivanje termina fotografisanja
- Pregled svojih termina
- Otkazivanje svojih termina (osim COMPLETED)

### Admin
- Sve funkcionalnosti korisnika
- Upravljanje paketima (CRUD)
- Upravljanje vrstama fotografisanja (CRUD)
- Pregled svih termina
- Promjena statusa termina
- Dashboard sa statistikama

## Baza podataka

Baza podataka se nalazi u `server/photo-booking.db` (SQLite).

### Tabele:
- `users` - Korisnici (id, username, email, password, role)
- `event_types` - Vrste fotografisanja (id, name, description)
- `packages` - Paketi usluga (id, name, description, price, duration_minutes)
- `bookings` - Termini (id, user_id, event_type_id, package_id, start_time, end_time, location, note, phone, status)

## Napomene

- Token ističe nakon 1 sata
- Preklapanje termina se provjerava automatski pri kreiranju
- End time se automatski izračunava na osnovu trajanja paketa, ali može se ručno mijenjati
- Admin može vidjeti sve termine, korisnici samo svoje

## Razvoj

Za razvoj, koristite:
- Backend: `nodemon server.js` (automatski restart)
- Frontend: `npm start` (hot reload)

## Licenca

ISC
