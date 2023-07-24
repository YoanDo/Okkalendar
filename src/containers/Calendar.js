import React, { useEffect, useState } from 'react';
import { fetchEvents } from '@/services/events';
import CalendarComponent from '@/components/Calendar';

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then((eventsData) => setEvents(eventsData));
  }, []);

  return <CalendarComponent events={events} />;
};

export default Calendar;
