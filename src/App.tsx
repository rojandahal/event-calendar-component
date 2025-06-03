import CalendarComponent from "./components/Calendar";
import {
  mockBadges,
  mockEvents,
  mockHolidays,
  mockTopBadge
} from "./data/mockData";
import { Badge, Event, Holiday, TopBadge } from "./types";

interface CalendarProps {
  events: Event[];
  badges: Badge[];
  holidays: Holiday[];
  topBadges: TopBadge[];
  weekendDays: number[];
}

function Calendar({
  events,
  badges,
  holidays,
  topBadges,
  weekendDays
}: CalendarProps) {
  return (
    <CalendarComponent
      events={mockEvents}
      badges={mockBadges}
      holidays={mockHolidays}
      topBadges={mockTopBadge}
      weekendDays={[0, 6]} // Sun = 0 to Sat = 6
    />
  );
}

export default Calendar;
