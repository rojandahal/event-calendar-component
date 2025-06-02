import Calendar from "./components/Calendar";
import { badges, events, holidays } from "./data/mockData";
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
          <Calendar events={events} badges={badges} holidays={holidays} />
        </main>

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Interactive Calendar. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
