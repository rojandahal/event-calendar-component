import { Badge, Event, Holiday, TopBadge } from "../types";

// Sample events data
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Event One",
    startDate: new Date(2025, 5, 2),
    endDate: new Date(2025, 5, 13),
    category: "event",
    description: "This is a multi-day event spanning across dates.",
    isHoliday: null
  },
  {
    id: "2",
    title: "Event Two",
    startDate: new Date(2025, 5, 3),
    endDate: new Date(2025, 5, 3),
    category: "project",
    description: "Project planning session with team members.",
    isHoliday: true,
    color: "#f70fd2"
  }
];

// Sample holidays data
export const mockHolidays: Holiday[] = [
  {
    id: "1",
    name: "May Day",
    date: new Date(2025, 4, 9)
  },
  {
    id: "2",
    name: "Memorial Day",
    date: new Date(2025, 4, 26)
  },
  {
    id: "3",
    name: "Independence Day",
    date: new Date(2025, 6, 4)
  }
];

export const mockBadges: Badge[] = [
  {
    id: 1,
    category: "leave",
    date: new Date(2025, 5, 2),
    count: 2
  },
  {
    id: 2,
    category: "appointment",
    date: new Date(2025, 5, 2),
    count: 8
  },
  {
    id: 3,
    category: "wfh",
    date: new Date(2025, 5, 2),
    count: 6
  },
  {
    id: 4,
    category: "late",
    date: new Date(2025, 5, 2),
    count: 2
  },
];

export const mockTopBadge: TopBadge[] = [
  {
    id: 1,
    category: "project-count",
    date: new Date(2025, 5, 2),
    count: 12
  },
  {
    id: 2,
    category: "notes-count",
    date: new Date(2025, 5, 2),
    count: 3
  }
];
