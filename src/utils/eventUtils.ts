import { Event } from "../types";

export function getMultiDayEventGrid(dateRange: Date[], events?: Event[]) {
  const multiDayEvents =
    events &&
    events.filter(
      (e) => e.startDate.toDateString() !== e.endDate.toDateString()
    );
  const grid: Record<string, (Event | null)[]> = {};
  const eventRows: Record<string, number> = {};

  multiDayEvents &&
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

export function getContrastYIQ(hex: string): string {
  // strip leading ‘#’ if present
  const cleaned = hex.replace(/^#/, "");

  // parse r, g, b values
  const r = parseInt(cleaned.substr(0, 2), 16);
  const g = parseInt(cleaned.substr(2, 2), 16);
  const b = parseInt(cleaned.substr(4, 2), 16);

  // compute the YIQ value
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  // return black for light backgrounds, white for dark ones
  return yiq >= 128 ? "#000000" : "#FFFFFF";
}

export function getBackgroundForColor(hex: string): string {
  const customHex = hex.replace("#", "");
  if (customHex.length === 6) {
    const r = parseInt(customHex.substring(0, 2), 16);
    const g = parseInt(customHex.substring(2, 4), 16);
    const b = parseInt(customHex.substring(4, 6), 16);
    const lighten = (c: number) => Math.round(c + (255 - c) * 0.5);
    return `#${lighten(r).toString(16).padStart(2, "0")}${lighten(g)
      .toString(16)
      .padStart(2, "0")}${lighten(b).toString(16).padStart(2, "0")}`;
  }
  return customHex;
}
