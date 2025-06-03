import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import WeekdayHeader from "./WeekdayHeader";
import DateCell from "./DateCell";
import {
  Badge,
  CategoryColor,
  DateCell as DateCellType,
  Event,
  Holiday,
  TopBadge
} from "../types";
import { generateCalendarDays } from "../utils/calendarUtils";
import { getMultiDayEventGrid } from "../utils/eventUtils";

interface CalendarProps {
  events?: Event[];
  badges?: Badge[];
  topBadges?: TopBadge[];
  holidays?: Holiday[];
  weekendDays?: number[];
  calendarColors?: CategoryColor[];
  initialDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  events,
  badges,
  topBadges,
  holidays,
  weekendDays,
  calendarColors,
  initialDate = new Date()
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Get current year and month
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Generate calendar days
  const calendarDays = generateCalendarDays(
    currentYear,
    currentMonth,
    holidays,
    weekendDays
  );

  // Handle month navigation
  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Handle event click
  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    console.log("ON EVENT CLICK", event);
    setSelectedEvent(event);
  };

  const multiDayEventGrid = getMultiDayEventGrid(
    calendarDays.map((cell) => cell.date),
    events
  );

  function handleCellClick(date: DateCellType, e: React.MouseEvent) {
    console.error("DATE AND EVENT", date, e);
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-0">
        <CalendarHeader
          currentDate={currentDate}
          onPreviousMonth={handlePreviousMonth}
          onNextMonth={handleNextMonth}
        />

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <WeekdayHeader weekendDays={weekendDays} />

          <div className="grid grid-cols-7">
            {calendarDays.map((cell, index) => {
              const rowIndex = Math.floor(index / 7);
              const colIndex = index % 7;

              return (
                <DateCell
                  key={index}
                  cell={cell}
                  events={events}
                  badges={badges}
                  isFirstColumn={colIndex === 0}
                  isLastColumn={colIndex === 6}
                  isFirstRow={rowIndex === 0}
                  isLastRow={rowIndex === 5}
                  onEventClick={handleEventClick}
                  onCellClick={handleCellClick}
                  multiDayEventGrid={multiDayEventGrid}
                  topBadges={topBadges}
                  calendarColors={calendarColors}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-center flex-wrap items-center gap-4 text-sm">
          <span>Indicators:</span>
          <div className="flex items-center space-x-2">
            <span>Today</span>
            <div className="w-4 h-4 rounded-full bg-today"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>Leaves</span>
            <div className="w-4 h-4 rounded-full bg-leave"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>Holidays</span>
            <div className="w-4 h-4 rounded-full bg-holidays"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>WFH</span>
            <div className="w-4 h-4 rounded-full bg-wfh"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>Late</span>
            <div className="w-4 h-4 rounded-full bg-late"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>Appointments</span>
            <div className="w-4 h-4 rounded-full bg-appointments"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>Projects</span>
            <div className="w-4 h-4 rounded-full bg-projects"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span>Notes</span>
            <div className="w-4 h-4 rounded-full bg-notes"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
