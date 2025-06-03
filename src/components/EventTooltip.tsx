import React from "react";
import { Event } from "../types";
import {
  formatDate,
  formatTime,
  getCategoryColor
} from "../utils/calendarUtils";

interface EventTooltipProps {
  event: Event;
  onClose: () => void;
}

const EventTooltip: React.FC<EventTooltipProps> = ({ event, onClose }) => {
  const categoryColor = getCategoryColor(event.category);
  const isSameDay =
    event.startDate.toDateString() === event.endDate.toDateString();

  // Handle click outside to close tooltip
  const tooltipRef = React.useRef<HTMLDivElement>(null);

  // React.useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       tooltipRef.current &&
  //       !tooltipRef.current.contains(event.target as Node)
  //     ) {
  //       onClose();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [onClose]);

  return (
    <div
      ref={tooltipRef}
      className="absolute z-10 bg-white rounded-lg shadow-lg p-4 w-72 border border-gray-200"
      style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ×
        </button>
      </div>

      <div
        className="w-full h-1 mb-3 rounded-full"
        style={{ backgroundColor: categoryColor.color }}
      />

      <div className="space-y-2 text-sm">
        <div className="flex items-start">
          <span className="material-icons text-gray-500 mr-2 text-lg">🗓️</span>
          <div>
            {isSameDay ? (
              <p>{formatDate(event.startDate)}</p>
            ) : (
              <p>
                {formatDate(event.startDate)} - {formatDate(event.endDate)}
              </p>
            )}
            <p className="text-gray-500">
              {formatTime(event.startDate)} - {formatTime(event.endDate)}
            </p>
          </div>
        </div>

        {event.description && (
          <div className="flex items-start">
            <span className="material-icons text-gray-500 mr-2 text-lg">
              📝
            </span>
            <p>{event.description}</p>
          </div>
        )}

        <div className="flex items-center mt-2">
          <span className="material-icons text-gray-500 mr-2 text-lg">🏷️</span>
          <div
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: categoryColor.backgroundColor,
              color: categoryColor.color
            }}
          >
            {categoryColor.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTooltip;
