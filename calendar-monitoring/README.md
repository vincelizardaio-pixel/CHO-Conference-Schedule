# Calendar Monitoring (Web / Excel-style)

This small web app helps track **calendar of activities** and **event booking requests** with:
- Pending / Approved / Cancelled / Completed statuses
- Conflict detection for overlapping time slots per venue
- A daily “monitoring log” table

## How it works
- Open `index.html` in a browser.
- Add/edit booking requests in the form.
- Click **Save request** to append to the in-browser table.
- Conflicts are flagged when a new request overlaps an existing approved/pending request at the same venue.

## Data storage
- Requests are stored in `localStorage` in your browser.

## Run
- No build tools required.
- Open: `calendar-monitoring/index.html`

