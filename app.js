const express = require('express');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Set up Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: 'AIzaSyAy1lC6_yhV2sc9vtsCQWuhIbFJGon7xA8',
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get events from Google Calendar
app.get('/events', async (req, res) => {
  try {
    // Make a request to fetch the events
    const response = await calendar.events.list({
      calendarId: 'mitekshippingtampa@gmail.com',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items;
    res.json(events);
  } catch (error) {
    console.error('Error retrieving events', error);
    res.status(500).json({ error: 'Error retrieving events' });
  }
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
