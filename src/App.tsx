import CalendarComponent from "./components/Calendar";
// import { badges, events, holidays, topBadge } from "./data/mockData";
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
      events={events}
      badges={badges}
      holidays={holidays}
      topBadges={topBadges}
      weekendDays={weekendDays} // Sun = 0 to Sat = 6
    />
  );
}

export default Calendar;
