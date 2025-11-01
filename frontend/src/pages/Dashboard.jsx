import React from "react";
import Navbar from "../components/Navbar";
import ChartDisplay from "../components/ChartDisplay";
import SummaryCard from "../components/SummaryCard";

const Dashboard = ({ dashboardData }) => {
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-screen text-xl text-gray-600">
        ⚠️ No data found. Please upload a CSV file first.
      </div>
    );
  }

  const summary = dashboardData.summary;
  const chartData = dashboardData.chartData;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">📊 Dashboard</h1>

        {/* Summary Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {Object.entries(summary).map(([key, value]) => (
            <SummaryCard key={key} title={key} value={value} />
          ))}
        </div>

        {/* Chart Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Data Visualization</h2>
          <ChartDisplay chartData={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
