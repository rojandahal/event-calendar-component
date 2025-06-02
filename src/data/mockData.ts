import { Badge, Event, Holiday } from "../types";

// Sample events data
export const events: Event[] = [
  {
    id: "1",
    title: "Event One",
    startDate: new Date(2025, 5, 2),
    endDate: new Date(2025, 5, 7),
    category: "work",
    location: "Conference Room A",
    description: "This is a multi-day event spanning across dates."
  },
  {
    id: "2",
    title: "Event Two",
    startDate: new Date(2025, 5, 2),
    endDate: new Date(2025, 5, 7),
    category: "project",
    location: "Virtual Meeting",
    description: "Project planning session with team members."
  },
  {
    id: "3",
    title: "Leave",
    startDate: new Date(2025, 5, 2),
    endDate: new Date(2025, 5, 7),
    category: "leave",
    location: "any",
    description: "Project planning session with team members."
  },
  {
    id: "4",
    title: "Event Four",
    startDate: new Date(2025, 5, 2),
    endDate: new Date(2025, 5, 7),
    category: "project",
    location: "Virtual Meeting",
    description: "Project planning session with team members."
  },
  {
    id: "3",
    title: "Team Meeting",
    startDate: new Date(2025, 5, 15),
    endDate: new Date(2025, 5, 15),
    category: "work",
    location: "Conference Room B",
    description: "Weekly team sync-up."
  },
  {
    id: "4",
    title: "Doctor Appointment",
    startDate: new Date(2025, 5, 18),
    endDate: new Date(2025, 5, 18),
    category: "appointment",
    location: "Medical Center",
    description: "Annual checkup."
  },
  {
    id: "5",
    title: "Birthday Party",
    startDate: new Date(2025, 5, 25),
    endDate: new Date(2025, 5, 25),
    category: "personal",
    location: "Home",
    description: "Celebrating with friends and family."
  }
];

// Sample holidays data
export const holidays: Holiday[] = [
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

export const badges: Badge[] = [
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
    id: 1,
    category: "leave",
    date: new Date(2025, 5, 11),
    count: 6
  },
  {
    id: 1,
    category: "leave",
    date: new Date(2025, 5, 12),
    count: 2
  },
  {
    id: 1,
    category: "leave",
    date: new Date(2025, 5, 13),
    count: 2
  }
];
