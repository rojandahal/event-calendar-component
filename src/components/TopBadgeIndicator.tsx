import React from "react";
import { getCategoryColor } from "../utils/calendarUtils";
import { TopBadgeCategory } from "../types";
import ProjectIcon from "../assets/svg/briefcase.svg";
import NotesIcon from "../assets/svg/clipboard-signature.svg";

interface TopBadgeIndicator {
  id: number;
  category: TopBadgeCategory;
  count: number;
}

const TopBadgeIndicator: React.FC<TopBadgeIndicator> = ({
  id,
  category,
  count
}) => {
  const categoryColor = getCategoryColor(category);

  const renderIcons = () => {
    switch (category) {
      case "project-count":
        return <img src={ProjectIcon} alt="Project Icon" />;
      case "notes-count":
        return <img src={NotesIcon} alt="Notes Icon" />;
      default:
        return null;
    }
  };

  return (
    <div
      key={id}
      className="w-[34px] h-[16px] rounded-[2px] flex items-center justify-center text-xs text-white font-medium"
      style={{ backgroundColor: categoryColor.color }}
    >
      <div className="flex items-center gap-1">
        {count || 0}
        {renderIcons()}
      </div>
    </div>
  );
};

export default TopBadgeIndicator;
