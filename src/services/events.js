import axios from 'axios';

export const fetchEvents = () =>
  axios
    .get('/api/events')
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching events:', error);
      return [];
    });

export const addEvent = (newEvent) =>
  axios
    .post('/api/events', newEvent)
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error adding event:', error);
      return null;
    });

export const deleteEvent = (eventId) =>
  axios
    .delete('/api/events', { data: { id: eventId } })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error deleting event:', error);
      return null;
    });
