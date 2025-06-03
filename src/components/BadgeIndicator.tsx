import React from "react";
import { BadgeCategory } from "../types";
import { getCategoryColor } from "../utils/calendarUtils";

interface BadgeIndicatorProps {
  id: number;
  category: BadgeCategory;
  count: number;
}

const BadgeIndicator: React.FC<BadgeIndicatorProps> = ({
  id,
  category,
  count
}) => {
  const categoryColor = getCategoryColor(category);
  return (
    <div
      key={id}
      className="w-[28px] h-[16px] rounded-[2px] flex items-center justify-center text-xs text-white font-medium"
      style={{ backgroundColor: categoryColor.color }}
    >
      {count || 0}
    </div>
  );
};

export default BadgeIndicator;
