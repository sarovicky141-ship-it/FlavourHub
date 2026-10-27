# FlavourHub

FlavourHub is a React/Vite restaurant frontend with a local menu catalog and an Express REST API backed by MySQL for table bookings. Booking details are stored in MySQL only after a successful insert.

## Architecture

```text
React 19 + Vite
  ├── Home, menu, and about routes use client/src/data/menuData.js
  ├── Booking route uses the configurable API client
        ↓
Express 5 REST API
  ├── Booking route and request validation
  ├── Controllers and centralized error handling
  └── mysql2 connection pool
        ↓
MySQL: flavourhub_db
```

`client/src/pages/BookingPage.jsx` contains the reservation form. The only current form fields are name, 10-digit phone, email, number of persons (1–6), and booking date. There are no account, contact, or checkout data forms in the current app.

## Prerequisites

- Node.js 20.19+ or 22.12+ (Vite 8 requirement) and npm
- MySQL 8.0+
- MySQL Workbench (optional; the schema can also be run with a MySQL client)

## Local setup (PowerShell)

Install the existing client and server dependencies:

```powershell
Set-Location client
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }

Set-Location ..\server
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
```

Edit `server/.env` with the credentials for your local MySQL user. Set `DB_PASSWORD` to your actual local password; do not commit this file. `DB_NAME` must be `flavourhub_db`. The checked-in example intentionally contains placeholders, not working credentials.

`client/.env` sets the frontend API base URL:

```env
VITE_API_URL=http://localhost:5000/api
```

### Create the booking database

In MySQL Workbench, open and execute `database/schema.sql`. This creates `flavourhub_db`, the bookings table, and the existing menu catalog tables. The frontend menu is loaded from `client/src/data/menuData.js`; the MySQL menu tables and `database/seed.sql` are retained but are no longer used by the app.

### Start the application

In one PowerShell terminal:

```powershell
Set-Location server
npm run dev
```

In another:

```powershell
Set-Location client
npm run dev
```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health` for database connectivity. The endpoint reports `503` when MySQL is unavailable or credentials/schema are incorrect.

## API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Check API and MySQL connectivity |
| `POST` | `/api/bookings` | Validate and save a reservation |

Reservation JSON:

```json
{
  "name": "Guest Name",
  "phone": "9876543210",
  "email": "guest@example.com",
  "persons": 2,
  "booking_date": "2026-12-01"
}
```

The API uses parameterized SQL. The form retains values and reports API/validation errors if the insert fails; it shows success and clears the form only after the database confirms the insert. To verify a saved reservation in Workbench:

```sql
USE flavourhub_db;
SELECT id, name, phone, email, persons, booking_date, created_at
FROM bookings
ORDER BY id DESC;
```

## Tests and production build

```powershell
Set-Location server
npm test

Set-Location ..\client
npm run lint
npm run build
```

## Deployment configuration (not deployed)

The local MySQL server is not reachable from a deployed API by default. Provision a hosted MySQL database, import `database/schema.sql` (and optionally `database/seed.sql`), and configure the backend host's environment variables with `NODE_ENV=production`, that provider's hostname, port, database name, username, and password, and the deployed frontend origin in `FRONTEND_URL`. Set `DB_SSL=true` when the provider requires TLS; certificate validation remains enabled. If the provider supplies a CA certificate, make it available to the API and set `DB_SSL_CA` to its file path. Allow network access only from the API host where the provider supports IP/network allowlists. Keep all credentials in the hosting provider's secret/environment settings, not in source control.

Deploy the Express API and MySQL separately from the static frontend. Set `VITE_API_URL` to the public API base URL before building the frontend; Vite embeds this value at build time, so rebuild the frontend after changing it. Configure the static frontend host to rewrite app routes to `index.html` for React Router. Use `server/.env.example` and `client/.env.example` as safe variable templates, never as live credentials.
