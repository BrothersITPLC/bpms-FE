import React from "react";

const DatePicker = ({ field = {}, onChange }) => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="mb-4">
      {/* Check if field.label exists, else provide a default value */}
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.label || "Select a date"} {/* Default label */}
      </label>
      <input
        type="date"
        name={field.name}
        placeholder={field.placeholder}
        min={today}
        onChange={onChange} // Pass the onChange handler
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  );
};

export default DatePicker;
