import Calendar from "./components/Calendar";
import { badges, events, holidays, topBadge } from "./data/mockData";

function App() {
  return (
    <Calendar
      events={events}
      badges={badges}
      holidays={holidays}
      topBadges={topBadge}
      weekendDays={[0, 6]} // Sun = 0 to Sat = 6
    />
  );
}

export default App;
