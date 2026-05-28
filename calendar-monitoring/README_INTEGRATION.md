# Integrating the backend with the existing UI

Your current `index.html` saves to `localStorage`.
To use MySQL + conflict detection from the backend, change the UI to call:
- GET `/api/requests`
- POST `/api/requests`
- DELETE `/api/requests/:id`

## Note
This repo currently includes the backend + DB schema docs. The UI migration is straightforward but not automatically applied here.

## Socket.IO
The backend emits:
- `requests:updated`
When the event is received, refresh the table by calling `GET /api/requests`.

