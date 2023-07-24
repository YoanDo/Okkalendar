import { styled } from 'styled-components';

export const CalendarWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing(2)};
`;

export const CalendarNavigationPanel = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing(2)};

  .navigator_default_main {
    border: none;
  }

  .navigator_default_month {
    margin-bottom: ${({ theme }) => theme.spacing(2)};
  }

  .navigator_default_title,
  .navigator_default_titleleft,
  .navigator_default_titleright {
    border: none;
  }

  .navigator_default_todaybox {
    border: 1px solid ${({ theme }) => theme.colors.highlight};
  }

  .navigator_default_select .navigator_default_cell_box {
    background: ${({ theme }) => theme.colors.highlightBackground};
    opacity: 1;
  }
`;

export const WeekCalendarWrapper = styled.div`
  height: 100%;

  .calendar_default_event_inner {
    align-items: center;
    background: ${({ theme }) =>
      theme.colorWithOpacity(theme.colors.highlight, 80)};
    border-radius: ${({ theme }) => theme.borderRadius.small};
    border: none;
    color: ${({ theme }) => theme.colors.main};
    display: flex;
    font-size: ${({ theme }) => theme.fontSizes.default};
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(0.5)};
  }

  .calendar_default_main {
    border-radius: 6px;
    border: none;
    overflow: hidden;
  }
`;

export const CalendarTitle = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
