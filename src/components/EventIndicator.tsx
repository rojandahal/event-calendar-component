import React from "react";
import { EventCategory } from "../types";
import { getCategoryColor } from "../utils/calendarUtils";

interface EventIndicatorProps {
  category: EventCategory;
  isCompact?: boolean;
}

const EventIndicator: React.FC<EventIndicatorProps> = ({
  category,
  isCompact = false
}) => {
  const categoryColor = getCategoryColor(category);

  if (isCompact) {
    return (
      <div
        className="w-5 h-5 rounded-full flex items-center justify-center text-xs text-white font-medium"
        style={{ backgroundColor: categoryColor.color }}
      >
        {category.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div
      className="px-2 py-1 rounded-full text-xs font-medium mr-1 mb-1 inline-flex items-center"
      style={{
        backgroundColor: categoryColor.backgroundColor,
        color: categoryColor.color
      }}
    >
      {categoryColor.label}
    </div>
  );
};

export default EventIndicator;
