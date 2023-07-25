// Todo
// - modification event
// - check des 25m

import React, { useRef } from 'react';
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';
import { arrayOf, func, number, oneOfType, shape, string } from 'prop-types';
import { toast } from 'react-toastify';
import {
  CalendarNavigationPanel,
  CalendarTitle,
  CalendarWrapper,
  WeekCalendarWrapper,
} from './styles';
import getFormattedDate from '../../helpers/getTodayFormatedDate';
import formatDate from '../../helpers/formatDate';

const Calendar = ({ events, onAddEvent, onDeleteEvent }) => {
  const todayDate = getFormattedDate();
  const calendarRef = useRef();

  const handleTimeRangeSelected = async (args) => {
    const dp = calendarRef.current.control;
    dp.clearSelection();

    const newEvent = {
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
    };

    // Check for conflicting events
    const existingEvents = dp.events.list;
    const conflictingEvents = existingEvents.filter(
      (event) => event.start < newEvent.end && event.end > newEvent.start
    );

    // If there are conflicting events, show a warning toast
    if (conflictingEvents.length > 0) {
      toast.warn("I see you're busy, but your events shouldn't overlap");
      return;
    }

    const modal = await DayPilot.Modal.prompt(
      `Give a name to your new event that starts ${formatDate(
        args.start.value
      )} and ends ${formatDate(args.end.value)}`,
      'Event'
    );

    if (!modal.result) {
      return;
    }

    newEvent.text = modal.result;
    onAddEvent(newEvent);
  };

  return (
    <CalendarWrapper>
      <CalendarNavigationPanel>
        <CalendarTitle>Okkalendar</CalendarTitle>
        <DayPilotNavigator
          selectMode="Week"
          showMonths={1}
          skipMonths={1}
          startDate={todayDate}
          selectionDay={todayDate}
          onTimeRangeSelected={(args) => {
            calendarRef.current.control.update({
              startDate: args.day,
            });
          }}
        />
      </CalendarNavigationPanel>
      <WeekCalendarWrapper>
        <DayPilotCalendar
          durationBarVisible={false}
          eventDeleteHandling="Update"
          events={events}
          onEventDeleted={({ e }) => onDeleteEvent(e.data.id)}
          onTimeRangeSelected={handleTimeRangeSelected}
          ref={calendarRef}
          startDate={todayDate}
          timeRangeSelectedHandling="Enabled"
          viewType="Week"
        />
      </WeekCalendarWrapper>
    </CalendarWrapper>
  );
};

Calendar.propTypes = {
  events: arrayOf(
    shape({
      id: oneOfType([string, number]).isRequired,
      text: string.isRequired,
      start: string.isRequired,
      end: string.isRequired,
    })
  ),
  onAddEvent: func,
  onDeleteEvent: func,
};

export default Calendar;
