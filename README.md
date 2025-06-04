# Custom Event Calendar

A customizable and minimal event calendar component for React.

![npm version](https://img.shields.io/npm/v/custom-event-calendar?style=flat-square)
![license](https://img.shields.io/npm/l/custom-event-calendar?style=flat-square)

## Features

- 🗓 React + Tailwind CSS
- 📌 Supports events, badges, holidays, and top badges
- 🎨 Customizable and extendable
- ⚡️ Lightweight and easy to integrate

## Installation

```bash
npm i @rojandahal/custom-event-calendar
```

## Usage

```tsx
import React from "react";
import { CustomEventCalendar } from "@rojanadahal/custom-event-calendar";

function App() {
  const events = [
    {
      id: "1",
      title: "Event One",
      startDate: new Date(2025, 5, 2),
      endDate: new Date(2025, 5, 13),
      category: "event",
      location: "Conference Room A",
      description: "This is a multi-day event spanning across dates."
    }
  ];

  const badges = [
    {
      date: "2025-06-02",
      label: "New",
      color: "green"
    }
  ];

  const holidays = [
    {
      date: "2025-06-15",
      name: "Public Holiday"
    }
  ];

  const topBadges = [
    {
      date: "2025-06-05",
      label: "🔥"
    }
  ];

  const weekendDays = [0, 6]; // Sunday and Saturday

  return (
    <div className="p-4">
      <CustomEventCalendar
        events={events}
        badges={badges}
        holidays={holidays}
        topBadges={topBadges}
        weekendDays={weekendDays}
      />
    </div>
  );
}

export default App;
```

## Props

| Prop         | Type           | Description                                    |
|--------------|----------------|------------------------------------------------|
| `events`     | `Event[]`      | Array of calendar events                       |
| `badges`     | `Badge[]`      | Array of badge labels for specific days        |
| `holidays`   | `Holiday[]`    | Array of holidays to highlight                 |
| `topBadges`  | `TopBadge[]`   | Array of top badges/icons for special days     |
| `weekendDays`| `number[]`     | Days considered weekends (0 = Sunday, 6 = Saturday) |

### Type Definitions

```ts
type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  category?: string;
  location?: string;
  description?: string;
};

type Badge = {
  date: string; // ISO string: "YYYY-MM-DD"
  label: string;
  color?: string; // e.g., "green", "red" or HEX code
};

type Holiday = {
  date: string; // ISO string: "YYYY-MM-DD"
  name: string;
};

type TopBadge = {
  date: string; // ISO string: "YYYY-MM-DD"
  label: string; // emoji or short string
};
```

## Development

To run the project locally:

```bash
npm install
npm run dev
```

To build the package for npm:

```bash
npm run build
```

## Repository

[GitLab Repo](https://gitlab.com/rojandahal1/event-calendar.git)

## License

MIT License

---

© [Rojan Dahal] – [mr.dahalrojan@gmail.com](mailto:mr.dahalrojan@gmail.com)

---

Let me know if you also want:

* A `CONTRIBUTING.md`
* Auto-generated API docs
* A screenshot or GIF showing the calendar in action
