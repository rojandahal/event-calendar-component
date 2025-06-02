import { Event } from "../types";

export function getMultiDayEventGrid(events: Event[], dateRange: Date[]) {
  const multiDayEvents = events.filter(
    (e) => e.startDate.toDateString() !== e.endDate.toDateString()
  );
  const grid: Record<string, (Event | null)[]> = {};
  const eventRows: Record<string, number> = {};

  multiDayEvents.forEach((event) => {
    const eventDates: string[] = [];
    for (
      let d = new Date(event.startDate);
      d <= event.endDate;
      d.setDate(d.getDate() + 1)
    ) {
      eventDates.push(d.toDateString());
    }
    let row = 0;
    let found = false;
    while (!found) {
      if (
        eventDates.every((dateKey) => !grid[dateKey] || !grid[dateKey][row])
      ) {
        eventDates.forEach((dateKey) => {
          if (!grid[dateKey]) grid[dateKey] = [];
          grid[dateKey][row] = event;
        });
        eventRows[event.id] = row;
        found = true;
      } else {
        row++;
      }
    }
  });

  // Fill empty slots with null for each date
  dateRange.forEach((date) => {
    const key = date.toDateString();
    if (!grid[key]) grid[key] = [];
    const maxRows = Math.max(
      ...Object.values(grid).map((arr) => arr.length),
      0
    );
    for (let i = 0; i < maxRows; i++) {
      if (!grid[key][i]) grid[key][i] = null;
    }
  });

  return grid;
}
