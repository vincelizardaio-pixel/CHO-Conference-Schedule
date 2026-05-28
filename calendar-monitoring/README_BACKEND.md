# Backend (Node.js/Express)

This backend replaces the in-browser localStorage with a simple API + JSON file persistence.

## Setup
In this folder:
- `calendar-monitoring/`

Run:
1) `npm install`
2) `node server.js` (or `npm start`)

API:
- GET `/api/requests` -> { items: [...] }
- POST `/api/requests` -> { item, conflicts }
- DELETE `/api/requests/:id` -> { ok: true }

## Conflict detection
- Same rule as the front-end: overlapping time intervals on the same `date` and `venue`.
- Excludes requests with status `Cancelled` and `Postponed` from being considered conflicts.

