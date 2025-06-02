import { Event } from "../types";

/**
 * Returns a map: { [dateKey]: Array<{ event: Event | null }> }
 * Each array index is a row. If no event for that row on that date, value is null.
 */
export function getMultiDayEventGrid(
  events: Event[],
  dateRange: Date[]
): Record<string, (Event | null)[]> {
  // Only multi-day events
  const multiDayEvents = events.filter(
    (e) => e.startDate.toDateString() !== e.endDate.toDateString()
  );

  // Build a map of dateKey -> array of events per row
  const grid: Record<string, (Event | null)[]> = {};

  // Track row assignment for each event
  const eventRows: Record<string, number> = {};

  // For each event, assign a row (slot) that is free for all its days
  multiDayEvents.forEach((event) => {
    // Find all date keys this event spans
    const eventDates: string[] = [];
    for (
      let d = new Date(event.startDate);
      d <= event.endDate;
      d.setDate(d.getDate() + 1)
    ) {
      eventDates.push(d.toDateString());
    }

    // Find the first available row across all these dates
    let row = 0;
    let found = false;
    while (!found) {
      if (
        eventDates.every((dateKey) => !grid[dateKey] || !grid[dateKey][row])
      ) {
        // Assign this row to the event for all its days
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
