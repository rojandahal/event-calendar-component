import {
  Event,
  Holiday,
  DateCell,
  CategoryColor,
  EventCategory,
  BadgeCategory,
  TopBadgeCategory
} from "../types";

// Get days in month
export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

// Get day of week (0-6, where 0 is Sunday)
export const getDayOfWeek = (date: Date): number => {
  return date.getDay();
};

// Format date as YYYY-MM-DD
export const formatDateKey = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
};

// Check if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Check if a date is between two dates (inclusive)
export const isDateBetween = (
  date: Date,
  startDate: Date,
  endDate: Date
): boolean => {
  const normalizedDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const normalizedStartDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()
  );
  const normalizedEndDate = new Date(
    endDate.getFullYear(),
    endDate.getMonth(),
    endDate.getDate()
  );

  return (
    normalizedDate >= normalizedStartDate && normalizedDate <= normalizedEndDate
  );
};

// Check if a date is a holiday
export const isHoliday = (
  date: Date,
  holidays: Holiday[]
): Holiday | undefined => {
  return holidays.find((holiday) => isSameDay(date, holiday.date));
};

// Generate date cells for a month view
export const generateCalendarDays = (
  year: number,
  month: number,
  holidays: Holiday[],
  isWeekend: boolean,
  weekendDays: number[]
): DateCell[] => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = getDayOfWeek(firstDayOfMonth);

  // Get the last day of the previous month
  const daysInPreviousMonth = getDaysInMonth(year, month - 1);
  const previousMonth = month - 1 < 0 ? 11 : month - 1;
  const previousMonthYear = month - 1 < 0 ? year - 1 : year;

  // Calculate next month and year
  const nextMonth = month + 1 > 11 ? 0 : month + 1;
  const nextMonthYear = month + 1 > 11 ? year + 1 : year;

  const today = new Date();
  const cells: DateCell[] = [];

  // Add days from previous month
  for (let i = 0; i < firstDayOfWeek; i++) {
    const date = new Date(
      previousMonthYear,
      previousMonth,
      daysInPreviousMonth - firstDayOfWeek + i + 1
    );
    const holiday = isHoliday(date, holidays);

    cells.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isHoliday: !!holiday,
      holidayName: holiday?.name,
      isWeekend: isWeekend ? weekendDays.includes(date.getDay()) : false
    });
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const holiday = isHoliday(date, holidays);

    cells.push({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, today),
      isHoliday: !!holiday,
      holidayName: holiday?.name,
      isWeekend: isWeekend ? weekendDays.includes(date.getDay()) : false
    });
  }

  // Add days from next month
  const remainingCells = 42 - cells.length; // 6 rows × 7 columns = 42 cells
  for (let i = 1; i <= remainingCells; i++) {
    const date = new Date(nextMonthYear, nextMonth, i);
    const holiday = isHoliday(date, holidays);

    cells.push({
      date,
      isCurrentMonth: false,
      isToday: isSameDay(date, today),
      isHoliday: !!holiday,
      holidayName: holiday?.name,
      isWeekend: isWeekend ? weekendDays.includes(date.getDay()) : false
    });
  }

  return cells;
};

// Get events for a specific date
export const getEventsForDate = (date: Date, events: Event[]): Event[] => {
  return events.filter((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);
    return isDateBetween(date, eventStartDate, eventEndDate);
  });
};

// Check if an event starts on a given date
export const eventStartsOnDate = (event: Event, date: Date): boolean => {
  return isSameDay(event.startDate, date);
};

// Check if an event ends on a given date
export const eventEndsOnDate = (event: Event, date: Date): boolean => {
  return isSameDay(event.endDate, date);
};

// Get category colors
export const getCategoryColors = (): CategoryColor[] => {
  return [
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
  ];
};

// Get the color for a category
export const getCategoryColor = (
  category: EventCategory | BadgeCategory | TopBadgeCategory
): CategoryColor => {
  const colors = getCategoryColors();
  return colors.find((c) => c.category === category) || colors[0];
};

// Format date to display in UI
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

// Format time to display in UI
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
};

export const getEndOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = 6 - day; // Days until the end of the week (Saturday)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
};

// Helper function to get the start of the week
export const getStartOfWeek = (date: Date) => {
  const day = date.getDay();
  const diff = -day; // Days since the start of the week (Sunday)
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
};
