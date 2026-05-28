# Real-time updates with Socket.IO

The backend emits `requests:updated` whenever requests are created/updated/deleted.

Clients can connect to the Socket.IO server:
- URL: `http://localhost:3000` (default)

Events:
- `requests:welcome` (sent on connection)
- `requests:updated` (sent after data changes)

