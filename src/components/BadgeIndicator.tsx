import React from "react";
import { BadgeCategory, CategoryColor } from "../types";
import { getCategoryColor } from "../utils/calendarUtils";

interface BadgeIndicatorProps {
  id: number;
  category: BadgeCategory;
  count: number;
  calendarColors?: CategoryColor[];
}

const BadgeIndicator: React.FC<BadgeIndicatorProps> = ({
  id,
  category,
  count,
  calendarColors
}) => {
  const categoryColor = getCategoryColor(category, calendarColors);
  return (
    <div
      key={id}
      className="w-[28px] h-[16px] rounded-[2px] flex items-center justify-center text-xs text-white font-medium"
      style={{ backgroundColor: categoryColor.backgroundColor }}
    >
      {count || 0}
    </div>
  );
};

export default BadgeIndicator;
