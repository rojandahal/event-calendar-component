import React from "react";

interface WeekdayHeaderProps {
  weekendDays?: number[];
}

const WeekdayHeader: React.FC<WeekdayHeaderProps> = ({ weekendDays }) => {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  const getDayClass = (index: number) =>
    weekendDays && weekendDays.includes(index)
      ? "text-red-500"
      : "text-gray-600";

  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {weekdays.map((day, index) => (
        <div
          key={index}
          className={`py-2 text-center text-sm font-medium border-r last:border-r-0 border-gray-200 ${getDayClass(
            index
          )}`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdayHeader;
