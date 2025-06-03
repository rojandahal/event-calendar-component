export type EventCategory =
  | "work"
  | "personal"
  | "appointment"
  | "project"
  | "holiday"
  | "leave"
  | "event";

export type BadgeCategory = "appointment" | "leave" | "late" | "wfh";
export type TopBadgeCategory = "project-count" | "notes-count";

export interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  category: EventCategory;
  location?: string;
  description?: string;
  color?: string;
  isHoliday: boolean | null;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
}

export interface CategoryColor {
  category: EventCategory | BadgeCategory | TopBadgeCategory;
  color: string;
  backgroundColor: string;
  label: string;
}

export interface DateCell {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isHoliday: boolean;
  holidayName?: string;
  isWeekend: boolean;
}

export interface Badge {
  id: number;
  category: BadgeCategory;
  date: Date;
  count: number;
}

export interface TopBadge {
  id: number;
  category: TopBadgeCategory;
  date: Date;
  count: number;
}
