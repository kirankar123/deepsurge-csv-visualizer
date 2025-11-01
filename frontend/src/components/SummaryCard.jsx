import React from "react";

const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 shadow-md rounded-xl text-center">
      <h3 className="text-gray-600 text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold text-blue-600 mt-2">{value}</p>
    </div>
  );
};

export default SummaryCard;
