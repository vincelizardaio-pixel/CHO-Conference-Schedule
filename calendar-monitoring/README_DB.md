# Database (MySQL) setup

This backend expects a MySQL database to store booking requests.

## 1) Create database
```sql
CREATE DATABASE IF NOT EXISTS calendar_monitoring;
```

## 2) Create table
```sql
USE calendar_monitoring;

CREATE TABLE IF NOT EXISTS booking_requests (
  id VARCHAR(64) PRIMARY KEY,
  department VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  event_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  venue VARCHAR(255) NOT NULL,
  participants INT NULL,
  equipment TEXT NULL,
  status VARCHAR(32) NOT NULL,
  remarks TEXT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_booking_date_venue ON booking_requests(event_date, venue);
```

## 3) Create `.env` (copy from `.env.example`)
Update:
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

Run server:
- `npm start`

