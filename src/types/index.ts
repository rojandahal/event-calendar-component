export type EventCategory =
  | "work"
  | "personal"
  | "appointment"
  | "project"
  | "holiday"
  | "leave"
  | "event";

export type BadgeCategory = "appointment" | "leave" | "late" | "wfh";

export interface Event {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  category: EventCategory;
  location?: string;
  description?: string;
  color?: string;
}

export interface Holiday {
  id: string;
  name: string;
  date: Date;
}

export interface CategoryColor {
  category: EventCategory;
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
}

export interface Badge {
  id: number;
  category: BadgeCategory;
  date: Date;
  count: number;
}
