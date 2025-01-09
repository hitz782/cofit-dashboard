import React from "react";
import MiddleSection from "./MiddleSection";
import "../assets/Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <div className="left-section">
        <h2>This is left</h2>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <h2>This is middle</h2>
        <MiddleSection />
      </div>

      {/* Right Sidebar */}
      <div className="right-section">
        <h2>This is right side</h2>
      </div>
    </div>
  );
}

export default Dashboard;
