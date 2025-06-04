import CalendarComponent from "./components/Calendar";
// import {
//   mockBadges,
//   mockEvents,
//   mockHolidays,
//   mockTopBadge,
// } from "./data/mockData";
import { Badge, Event, Holiday, TopBadge } from "./types";

export interface CalendarProps {
  events: Event[];
  badges: Badge[];
  holidays: Holiday[];
  topBadges: TopBadge[];
  weekendDays: number[];
}

const Calendar = ({
  events,
  badges,
  holidays,
  topBadges,
  weekendDays,
}: CalendarProps) => {
  return (
    <CalendarComponent
      events={events}
      badges={badges}
      holidays={holidays}
      topBadges={topBadges}
      weekendDays={weekendDays} // Sun = 0 to Sat = 6
    />
  );
};

export default Calendar;
