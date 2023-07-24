import React, { useRef, useEffect } from 'react';
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';
import { arrayOf, number, oneOfType, shape, string } from 'prop-types';
import {
  CalendarNavigationPanel,
  CalendarTitle,
  CalendarWrapper,
  WeekCalendarWrapper,
} from './styles';
import getFormattedDate from '@/helpers/getTodayFormatedDate';
import formatDate from '@/helpers/formatDate';

const Calendar = ({ events }) => {
  const todayDate = getFormattedDate();
  const calendarRef = useRef();

  useEffect(() => {
    const startDate = todayDate;
    const dp = calendarRef.current.control;
    dp.update({ startDate, events });
    // * premium functions to keep in mind
    // dp.weekStarts = 6;
    // dp.allowEventOverlap = false;
  }, [todayDate]);

  const handleTimeRangeSelected = async (args) => {
    const dp = calendarRef.current.control;
    dp.clearSelection();
    const modal = await DayPilot.Modal.prompt(
      `Give a name to your new event that starts ${formatDate(
        args.start.value
      )} and ends ${formatDate(args.end.value)}`,
      'Event'
    );
    if (!modal.result) {
      return;
    }

    const newEvent = {
      start: args.start,
      end: args.end,
      id: DayPilot.guid(),
      text: modal.result,
    };

    // Check for overlapping events
    const existingEvents = dp.events.list;
    const overlappingEvents = existingEvents.filter(
      (event) => event.start < newEvent.end && event.end > newEvent.start
    );

    // If there are overlapping events, adjust the new event's start and end times
    if (overlappingEvents.length > 0) {
      // todo replace by toastify
      alert('Event should not overlap');
      return;
    }

    dp.events.add(newEvent);
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
          onTimeRangeSelected={handleTimeRangeSelected}
          ref={calendarRef}
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
};

export default Calendar;
