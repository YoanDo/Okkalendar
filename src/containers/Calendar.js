import React, { useEffect, useState } from 'react';
import { fetchEvents, addEvent, deleteEvent } from '@/services/events';
import CalendarComponent from '@/components/Calendar';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then((eventsData) => setEvents(eventsData));
  }, []);

  const handleAddEvent = (newEvent) => {
    addEvent(newEvent).then((addedEvent) => {
      if (addedEvent) {
        setEvents((prevEvents) => [...prevEvents, addedEvent]);
      }
    });
  };

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId).then((deletedEventId) => {
      if (deletedEventId) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event.id !== deletedEventId)
        );
      }
    });
  };

  return (
    <CalendarComponent
      events={events}
      onAddEvent={handleAddEvent}
      onDeleteEvent={handleDeleteEvent}
    />
  );
};

export default Calendar;
