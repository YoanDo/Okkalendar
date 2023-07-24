import React, { useRef, useEffect, useState } from 'react';
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';
import {
  CalendarNavigationPanel,
  CalendarTitle,
  CalendarWrapper,
  WeekCalendarWrapper,
} from './styles';
import { fakeEvents } from './fixtures';
import getFormattedDate from '@/helpers/getTodayFormatedDate';
import formatDate from '@/helpers/formatDate';

const Calendar = () => {
  const todayDate = getFormattedDate();
  const calendarRef = useRef();

  useEffect(() => {
    const startDate = todayDate;
    const dp = calendarRef.current.control;
    dp.update({ startDate, events: fakeEvents });
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
    const events = dp.events.list;
    const overlappingEvents = events.filter(
      (event) => event.start < newEvent.end && event.end > newEvent.start
    );

    // If there are overlapping events, adjust the new event's start and end times
    if (overlappingEvents.length > 0) {
      console.log('overlapping');
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
          events={fakeEvents}
          onTimeRangeSelected={handleTimeRangeSelected}
          ref={calendarRef}
          timeRangeSelectedHandling="Enabled"
          viewType="Week"
        />
      </WeekCalendarWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
