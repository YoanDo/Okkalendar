import axios from 'axios';
import { toast } from 'react-toastify';

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
    .then(({ data }) => {
      toast.success('Scheduled 👌');
      return data;
    })
    .catch((error) => {
      toast.error('Something went wrong 🤔');
      console.error('Error adding event:', error);
      return null;
    });

export const deleteEvent = (eventId) =>
  axios
    .delete('/api/events', { data: { id: eventId } })
    .then(({ data }) => {
      toast.success('Removed from your calendar 🗑');
      return data;
    })
    .catch((error) => {
      toast.error('Something went wrong 🤔');
      console.error('Error deleting event:', error);
      return null;
    });
