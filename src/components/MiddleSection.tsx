import React, { useState, useEffect } from "react";
import GraphComponent from "./GraphComponent";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function MiddleSection() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [graphData, setGraphData] = useState<{ target: number[]; achieved: number[] }>({
    target: [],
    achieved: [],
  });

  const formatDateLabel = (date: Date, index: number): string => {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    return index === 0 ? `${month} ${day}` : `${day}`;
  };

  const generateGraphData = (start: string, end: string) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);
    const timeDiff = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24));

    if (timeDiff < 0) {
      alert("End date must be greater than or equal to start date.");
      return;
    }

    const generatedLabels: string[] = [];
    for (let i = 0; i <= timeDiff; i++) {
      const currentDate = new Date(startDateObj);
      currentDate.setDate(startDateObj.getDate() + i);
      generatedLabels.push(formatDateLabel(currentDate, i));
    }

    const newTarget = generatedLabels.map(() => Math.floor(Math.random() * 4000) + 1000);
    const newAchieved = newTarget.map((t) => Math.floor(Math.random() * t));

    setLabels(generatedLabels);
    setGraphData({ target: newTarget, achieved: newAchieved });
  };

  useEffect(() => {
    if (startDate && endDate) {
      generateGraphData(startDate, endDate);
    }
  }, [startDate, endDate]);

  const remainingSteps = graphData.target.map((t, i) => Math.max(t - graphData.achieved[i], 0));
  const achievedSteps = graphData.achieved.map((a, i) => Math.min(a, graphData.target[i]));

  const data = {
    labels: labels.length > 0 ? labels : Array(10).fill("Date"),
    datasets: [
      {
        label: "Achieved Steps",
        data: labels.length > 0 ? achievedSteps : Array(10).fill(0),
        backgroundColor: "rgba(18, 14, 54, 0.8)",
      },
      {
        label: "Remaining Steps",
        data: labels.length > 0 ? remainingSteps : Array(10).fill(0),
        backgroundColor: "rgba(18, 14, 54, 0.3)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Steps Overview" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, ticks: { stepSize: 1000 } },
    },
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "#e3e3e3",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="heading"
        style={{
          backgroundColor: "#120e36",
          height: "60px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h5 style={{ color: "white", margin: 0 }}>Time Based Metrics</h5>
      </div>

      <div
        className="date-range-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          padding: "10px 20px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="start-date" style={{ marginRight: "10px" }}>
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
            }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <label htmlFor="end-date" style={{ marginRight: "5px" }}>
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            style={{
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              outline: "none",
            }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <button
          style={{
            backgroundColor: "#120e36",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "200px",
          }}
          onClick={() => generateGraphData(startDate, endDate)}
        >
          Generate Report
        </button>
      </div>

      <h6
        className="my-2"
        style={{
          textAlign: "left",
          fontWeight: "bold",
          margin: "20px",
        }}
      >
        Activity Overview
      </h6>

      <GraphComponent data={data} options={options} />
    </div>
  );
}

export default MiddleSection;
