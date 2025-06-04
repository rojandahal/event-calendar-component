import Calendar from './Calendar';
import { Event, Badge, Holiday, TopBadge, EventCategory, BadgeCategory, TopBadgeCategory } from './types';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Meeting',
    startDate: new Date(2024, 2, 20, 10, 0),
    endDate: new Date(2024, 2, 20, 11, 0),
    category: 'work' as EventCategory,
    color: '#4CAF50',
    isHoliday: false
  }
];

const mockBadges: Badge[] = [
  {
    id: 1,
    category: 'appointment' as BadgeCategory,
    date: new Date(2024, 2, 20),
    count: 1
  }
];

const mockHolidays: Holiday[] = [
  {
    id: '1',
    name: 'New Year',
    date: new Date(2024, 0, 1)
  }
];

const mockTopBadges: TopBadge[] = [
  {
    id: 1,
    category: 'project-count' as TopBadgeCategory,
    date: new Date(2024, 2, 20),
    count: 5
  }
];

const App = () => {
  return (
    <div className="p-4">
      <Calendar
        events={mockEvents}
        badges={mockBadges}
        holidays={mockHolidays}
        topBadges={mockTopBadges}
        weekendDays={[0, 6]} // Sunday and Saturday
      />
    </div>
  );
};

export default App; 