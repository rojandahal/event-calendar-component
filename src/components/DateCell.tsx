import React, { useState } from "react";
import {
  Event,
  DateCell as DateCellType,
  Badge,
  BadgeCategory,
  TopBadge,
  TopBadgeCategory,
  CategoryColor
} from "../types";
import EventTooltip from "./EventTooltip";
import {
  getCategoryColor,
  formatDateKey,
  getEndOfWeek
} from "../utils/calendarUtils";
import BadgeIndicator from "./BadgeIndicator";
import TopBadgeIndicator from "./TopBadgeIndicator";

interface DateCellProps {
  cell: DateCellType;
  events?: Event[];
  badges?: Badge[];
  topBadges?: TopBadge[];
  isFirstColumn: boolean;
  isLastColumn: boolean;
  isFirstRow: boolean;
  isLastRow: boolean;
  onEventClick: (event: Event, e: React.MouseEvent) => void;
  onCellClick: (cell: DateCellType, e: React.MouseEvent) => void;
  multiDayEventGrid: any;
  calendarColors?: CategoryColor[];
}

const DateCell: React.FC<DateCellProps> = ({
  cell,
  events,
  badges,
  topBadges,
  isFirstColumn,
  isLastColumn,
  isFirstRow,
  isLastRow,
  onEventClick,
  onCellClick,
  multiDayEventGrid,
  calendarColors
}) => {
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  // Filter events for this date
  const cellEvents =
    events &&
    events.filter((event) => {
      const eventStartDate = new Date(event.startDate);
      const eventEndDate = new Date(event.endDate);

      return (
        (eventStartDate <= cell.date && eventEndDate >= cell.date) ||
        eventStartDate.toDateString() === cell.date.toDateString() ||
        eventEndDate.toDateString() === cell.date.toDateString()
      );
    });

  const cellBadge =
    badges &&
    badges.filter((badge) => {
      return badge.date.toDateString() === cell.date.toDateString();
    });

  const cellTopBadge =
    topBadges &&
    topBadges.filter((badge) => {
      return badge.date.toDateString() === cell.date.toDateString();
    });

  // Get the event rows for this date from the grid
  const eventRows = multiDayEventGrid[cell.date.toDateString()] || [];

  const singleDayEvents =
    cellEvents &&
    cellEvents.filter(
      (event) => event.startDate.toDateString() === event.endDate.toDateString()
    );

  // Handle event click
  const handleEventClick = (event: Event, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveEvent(event);
    // setTooltipPosition({
    //   top: e.clientX,
    //   left: e.clientY
    // });
    onEventClick(event, e);
  };

  const closeTooltip = () => {
    setActiveEvent(null);
    setTooltipPosition(null);
  };

  return (
    <div
      className={`
      h-[140px] border border-gray-200 relative cursor-pointer
      ${cell.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-400"}
      ${cell.isToday ? "bg-today" : ""}
      ${cell.isHoliday ? "bg-holidays" : ""}
      `}
      style={{
        minHeight: "100px",
        backgroundColor: cell.isToday
          ? "#FFDEB0"
          : cell.isWeekend
          ? "#E6F6EF"
          : ""
      }}
      onClick={(e) => onCellClick(cell, e)}
    >
      <div className="flex p-1 justify-between">
        {/* Today's date to be circled */}
        <div
          className={`
        text-sm font-medium p-1 rounded-full w-7 h-7 flex items-center justify-center
        ${cell.isToday ? "bg-blue-500 text-white" : ""}
        `}
        >
          {cell.date.getDate()}
        </div>

        {/* Event count indicator for small screens */}
        {cellEvents && cellEvents.length > 0 && (
          <div className="md:hidden bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {cellEvents.length}
          </div>
        )}
      </div>

      {/* Holiday name */}
      {cell.isHoliday && cell.holidayName && (
        <div className="mt-1 mb-10 space-y-1 hidden md:block">
          <div className="text-[11px] text-center bg-holidaybar text-black mt-1 py-1 px-2 truncate cursor-pointer relative">
            {cell.holidayName}
          </div>
        </div>
      )}

      {/* Multi-day events */}
      <div
        className="mt-1 relative hidden md:block"
        style={{ minHeight: `${eventRows.length * 20}px` }}
      >
        {eventRows.map((event: Event, rowIndex: number) => {
          if (!event) {
            return (
              <div
                key={`empty-${rowIndex}`}
                style={{
                  height: "20px",
                  top: `${rowIndex * 20}px`,
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

          const categoryColor = getCategoryColor(
            event.category,
            calendarColors
          );

          return segments.map((segment, index) => {
            const isStart =
              segment.start.toDateString() === cell.date.toDateString();
            const segmentDays =
              Math.floor(
                (segment.end.getTime() - segment.start.getTime()) /
                  (1000 * 60 * 60 * 24)
              ) + 1;

            const segmentWidth = `${segmentDays * 101.1}%`;

            if (isStart) {
              return (
                <div
                  key={`${event.id}-${formatDateKey(segment.start)}-${index}`}
                  className={`
            py-1 text-xs font-medium truncate cursor-pointer absolute
            backdrop-blur-sm bg-white/40 border border-white/30
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
                    padding: 1,
                    width: segmentWidth,
                    zIndex: 1
                  }}
                  onClick={(e) => handleEventClick(event, e)}
                >
                  <span className="truncate text-[11px] w-full text-center">
                    {event.title}
                  </span>
                </div>
              );
            }

            return null;
          });
        })}
      </div>

      {/* Single-day events */}
      <div className="mt-1 mb-10 space-y-1 hidden md:block">
        {singleDayEvents &&
          singleDayEvents.map((event) => {
            const categoryColor = getCategoryColor(
              event.category,
              calendarColors
            );

            return (
              <div
                key={`${event.id}-${formatDateKey(cell.date)}`}
                className="py-1 px-2 text-[11px] font-medium truncate cursor-pointer relative"
                style={{
                  backgroundColor: categoryColor.backgroundColor,
                  color: categoryColor.color
                }}
                onClick={(e) => handleEventClick(event, e)}
              >
                {event.title}
              </div>
            );
          })}
      </div>

      {/* DISABLED FOR NOW */}
      {/* Tooltip */}
      {/* {activeEvent && tooltipPosition && (
        <div
          style={{
            position: "absolute",
            top: tooltipPosition.top,
            left: tooltipPosition.left,
            transform: "translateX(-100%)",
            zIndex: 1000
          }}
        >
          <EventTooltip event={activeEvent} onClose={closeTooltip} />
        </div>
      )} */}

      {/* Event indicators */}
      {cellBadge && cellBadge.length > 0 && (
        <div className="absolute bottom-1 left-1 right-1 flex justify-center space-x-1">
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
              calendarColors={calendarColors}
            />
          ))}
        </div>
      )}

      {/*  Top Badge Indicator */}
      {cellTopBadge && cellTopBadge.length > 0 && (
        <div className="absolute top-1 right-1 flex space-x-1">
          {Array.from(
            cellTopBadge
              .reduce((acc, badge) => {
                const key = badge.category;
                if (!acc.has(key)) {
                  acc.set(key, { category: key, count: badge.count });
                } else {
                  acc.get(key)!.count += badge.count;
                }
                return acc;
              }, new Map<string, { category: TopBadgeCategory; count: number }>())
              .values()
          ).map((item, index) => (
            <TopBadgeIndicator
              id={index}
              category={item.category}
              count={item.count}
              calendarColors={calendarColors}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DateCell;
