import React, { useState } from "react";
import {
  Event,
  DateCell as DateCellType,
  Badge,
  BadgeCategory
} from "../types";
import EventTooltip from "./EventTooltip";
import {
  eventStartsOnDate,
  eventEndsOnDate,
  getCategoryColor,
  formatDateKey,
  getEndOfWeek
} from "../utils/calendarUtils";
import BadgeIndicator from "./BadgeIndicator";

interface DateCellProps {
  cell: DateCellType;
  events: Event[];
  badges: Badge[];
  isFirstColumn: boolean;
  isLastColumn: boolean;
  isFirstRow: boolean;
  isLastRow: boolean;
  onEventClick: (event: Event) => void;
  multiDayEventGrid: any;
}

const DateCell: React.FC<DateCellProps> = ({
  cell,
  events,
  badges,
  isFirstColumn,
  isLastColumn,
  isFirstRow,
  isLastRow,
  onEventClick,
  multiDayEventGrid // <-- Add this prop
}) => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  // Filter events for this date
  const cellEvents = events.filter((event) => {
    const eventStartDate = new Date(event.startDate);
    const eventEndDate = new Date(event.endDate);

    return (
      (eventStartDate <= cell.date && eventEndDate >= cell.date) ||
      eventStartDate.toDateString() === cell.date.toDateString() ||
      eventEndDate.toDateString() === cell.date.toDateString()
    );
  });

  const cellBadge = badges.filter((badge) => {
    return badge.date.toDateString() === cell.date.toDateString();
  });

  // Get the event rows for this date from the grid
  const eventRows = multiDayEventGrid[cell.date.toDateString()] || [];

  const singleDayEvents = cellEvents.filter(
    (event) => event.startDate.toDateString() === event.endDate.toDateString()
  );

  // Handle event click
  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveEvent(event);
    onEventClick(event);
  };

  // Close tooltip
  const closeTooltip = () => {
    setActiveEvent(null);
  };

  return (
    <div
      className={`
      min-h-[100px] border border-gray-200 p-1 relative
      ${cell.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
      ${cell.isToday ? "bg-blue-50" : ""}
      ${cell.isHoliday ? "bg-green-50" : ""}
      `}
      style={{ minHeight: "100px" }}
    >
      <div className="flex justify-between">
        <div
          className={`
        text-sm font-medium p-1 rounded-full w-7 h-7 flex items-center justify-center
        ${cell.isToday ? "bg-blue-500 text-white" : ""}
        `}
        >
          {cell.date.getDate()}
        </div>

        {/* Event count indicator for small screens */}
        {cellEvents.length > 0 && (
          <div className="md:hidden bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {cellEvents.length}
          </div>
        )}
      </div>

      {/* Holiday name */}
      {cell.isHoliday && cell.holidayName && (
        <div className="text-xs text-green-600 font-medium mt-1">
          {cell.holidayName}
        </div>
      )}

      {/* Multi-day events */}
      <div
        className="mt-1 relative hidden md:block"
        style={{ minHeight: `${eventRows.length * 24}px` }}
      >
        {eventRows.map((event: Event, rowIndex: number) => {
          if (!event) {
            return (
              <div
                key={`empty-${rowIndex}`}
                style={{
                  height: "20px",
                  top: `${rowIndex * 24}px`,
                  position: "absolute",
                  left: 0,
                  right: 0
                }}
              />
            );
          }

          const eventStart = new Date(event.startDate);
          const eventEnd = new Date(event.endDate);

          const segments = [];
          let segmentStart = eventStart;
          while (segmentStart <= eventEnd) {
            const segmentEnd = new Date(
              Math.min(getEndOfWeek(segmentStart).getTime(), eventEnd.getTime())
            );
            segments.push({ start: segmentStart, end: segmentEnd });
            segmentStart = new Date(segmentEnd.getTime() + 24 * 60 * 60 * 1000); // Next day
          }

          const categoryColor = getCategoryColor(event.category);

          return segments.map((segment, index) => {
            const isStart =
              segment.start.toDateString() === cell.date.toDateString();
            const segmentDays =
              Math.floor(
                (segment.end.getTime() - segment.start.getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1;

            const segmentWidth = `${segmentDays * 100}%`;

            if (isStart) {
              return (
                <div
                  key={`${event.id}-${formatDateKey(segment.start)}-${index}`}
                  className={`
            py-1 px-2 text-xs font-medium truncate cursor-pointer absolute
            backdrop-blur-sm bg-white/40 border border-white/30 shadow
            flex items-center justify-center
          `}
                  style={{
                    backgroundColor: categoryColor.backgroundColor
                      ? categoryColor.backgroundColor + "80"
                      : "rgba(255,255,255,0.4)",
                    color: categoryColor.color,
                    height: "20px",
                    top: `${rowIndex * 24}px`,
                    left: 0,
                    width: segmentWidth,
                    zIndex: 1
                  }}
                  onClick={(e) => handleEventClick(event, e)}
                >
                  <span className="truncate text-[10px] w-full text-center">
                    {event.title}
                  </span>

                  {activeEvent && activeEvent.id === event.id && (
                    <EventTooltip event={event} onClose={closeTooltip} />
                  )}
                </div>
              );
            }

            return null;
          });
        })}
      </div>

      {/* Single-day events */}
      <div className="mt-1 mb-10 space-y-1 hidden md:block">
        {singleDayEvents.map((event) => {
          const categoryColor = getCategoryColor(event.category);

          return (
            <div
              key={`${event.id}-${formatDateKey(cell.date)}`}
              className="rounded-md py-1 px-2 text-xs font-medium truncate cursor-pointer relative"
              style={{
                backgroundColor: categoryColor.backgroundColor,
                color: categoryColor.color
              }}
              onClick={(e) => handleEventClick(event, e)}
            >
              {event.title}

              {activeEvent && activeEvent.id === event.id && (
                <EventTooltip event={event} onClose={closeTooltip} />
              )}
            </div>
          );
        })}
      </div>

      {/* Event indicators */}
      {cellBadge.length > 0 && (
        <div className="absolute bottom-1 left-1 flex space-x-1">
          {Array.from(
            cellBadge
              .reduce((acc, badge) => {
                const key = badge.category;
                if (!acc.has(key)) {
                  acc.set(key, { category: key, count: badge.count });
                } else {
                  acc.get(key)!.count += badge.count;
                }
                return acc;
              }, new Map<string, { category: BadgeCategory; count: number }>())
              .values()
          ).map((item, index) => (
            <BadgeIndicator
              id={index}
              category={item.category}
              count={item.count}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DateCell;
