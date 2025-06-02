import React from 'react';

const WeekdayHeader: React.FC = () => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 border-b border-gray-200">
      {weekdays.map((day, index) => (
        <div
          key={index}
          className="py-2 text-center text-sm font-medium text-gray-600 border-r last:border-r-0 border-gray-200"
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default WeekdayHeader;