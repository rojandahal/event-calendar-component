import Calendar from "./components/Calendar";
import { badges, events, holidays, topBadge } from "./data/mockData";
import { CalendarDays } from "lucide-react";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-10 h-10 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">
              Interactive Calendar
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            A beautiful calendar to manage your events and holidays
          </p>
        </header>

        <main>
          <Calendar
            events={events}
            badges={badges}
            holidays={holidays}
            topBadges={topBadge}
            weekendDays={[0, 6]} // Sun = 0 to Sat = 6
            calendarColors={[
              {
                category: "work",
                color: "#10B981",
                backgroundColor: "#D1FAE5",
                label: "Work"
              },
              {
                category: "personal",
                color: "#3B82F6",
                backgroundColor: "#DBEAFE",
                label: "Personal"
              },
              {
                category: "appointment",
                color: "#9313D8",
                backgroundColor: "#9313D8",
                label: "Appointment"
              },
              {
                category: "project",
                color: "#F59E0B",
                backgroundColor: "#FEF3C7",
                label: "Project"
              },
              {
                category: "holiday",
                color: "#EF4444",
                backgroundColor: "#FEE2E2",
                label: "Holiday"
              },
              {
                category: "leave",
                color: "#00A85F",
                backgroundColor: "#00A85F",
                label: "Leave"
              },
              {
                category: "event",
                color: "black",
                backgroundColor: "#B0E1FF",
                label: "Event"
              },
              {
                category: "late",
                color: "#E14A09",
                backgroundColor: "#E14A09",
                label: "Leave"
              },
              {
                category: "wfh",
                color: "#FF9500",
                backgroundColor: "#FF9500",
                label: "Leave"
              },
              {
                category: "project-count",
                color: "#009DFF",
                backgroundColor: "#FEE2E2",
                label: "Projects"
              },
              {
                category: "notes-count",
                color: "#0076BF",
                backgroundColor: "#0076BF",
                label: "Notes"
              }
            ]}
          />
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Interactive Calendar. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
