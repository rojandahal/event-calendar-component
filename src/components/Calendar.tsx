import React, { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import WeekdayHeader from "./WeekdayHeader";
import DateCell from "./DateCell";
import { Badge, Event, Holiday, TopBadge } from "../types";
import { generateCalendarDays } from "../utils/calendarUtils";
import { getMultiDayEventGrid } from "../utils/eventUtils";

interface CalendarProps {
  events: Event[];
  badges: Badge[];
  topBadges: TopBadge[];
  holidays: Holiday[];
  weekendDays: number[];
  initialDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  events,
  badges,
  topBadges,
  holidays,
  weekendDays,
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
    events,
    calendarDays.map((cell) => cell.date)
  );

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
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
                  multiDayEventGrid={multiDayEventGrid}
                  topBadges={topBadges}
                />
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Today</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-green-50"></div>
            <span>Holidays</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded bg-gray-50"></div>
            <span>Outside Current Month</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#10B981" }}
            ></div>
            <span>Work</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#3B82F6" }}
            ></div>
            <span>Personal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#8B5CF6" }}
            ></div>
            <span>Appointment</span>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: "#F59E0B" }}
            ></div>
            <span>Project</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
