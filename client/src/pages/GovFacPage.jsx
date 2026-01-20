import { useEffect, useState } from "react";
import "../styles/govfacpage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function GovernmentPage() {
  const [sensorData, setSensorData] = useState([]);
  const [activeTab, setActiveTab] = useState("charts");

  /* =========================
     FETCH SENSOR DATA
     ========================= */
  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/sensors");
        const data = await res.json();
        setSensorData(data);
        console.log("Sensors:", data);
      } catch (err) {
        console.error("Failed to load sensor data", err);
      }
    };

    fetchSensors();
  }, []);

  useEffect(() => {
  if (sensorData.length > 0) {
    console.log("FIRST SENSOR:", sensorData[0]);
    console.log("FIRST SENSOR DATAS:", sensorData[0].datas);
    console.log("FIRST DATA ENTRY:", sensorData[0].datas?.[0]);
  }
}, [sensorData]);

  /* =========================
     ADAPTER: SENSOR → UI DATA
     (TDS ONLY)
     ========================= */
    const adaptedHistoricalData = sensorData.flatMap((sensor) => {
  if (!Array.isArray(sensor.datas)) return [];

  return sensor.datas.map((d) => {
    const tds = d.metrics?.tds;

    if (typeof tds !== "number") {
      console.warn("Invalid TDS reading:", d);
      return null;
    }

    return {
      time: new Date(d.recordTime || sensor.lastUpdated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      tds,
      status:
        tds > 500
          ? "Critical"
          : tds > 300
          ? "Warning"
          : "Normal",
    };
  });
  }).filter(Boolean);

  const avgTDS =
    adaptedHistoricalData.reduce((sum, d) => sum + d.tds, 0) /
      adaptedHistoricalData.length || 0;

  const activeAnomalies = adaptedHistoricalData.filter(
    (d) => d.status !== "Normal"
  );

  const handleExport = (format) => {
    alert(`Generating AI-based ${format} report...`);
  };

  if (!adaptedHistoricalData.length) {
    return <p style={{ padding: "2rem" }}>No sensor data available.</p>;
  }

  

  return (
    <div className="gov-app-wrapper">
      {/* HEADER */}
      <div className="gov-app-container">
        <nav className="dashboard-nav">
        <h1 className="nav-title">
          HydraLink <span className="badge">Gov / Factory Portal</span>
        </h1>
      </nav>

      <div className="dashboard-container">
        {/* KPI CARDS */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <h3>Avg TDS</h3>
            <div className="value">{avgTDS.toFixed(0)} ppm</div>
            <span
              className={`status ${
                avgTDS > 500
                  ? "critical"
                  : avgTDS > 300
                  ? "warning"
                  : "normal"
              }`}
            >
              {avgTDS > 500
                ? "Critical"
                : avgTDS > 300
                ? "Elevated"
                : "Normal"}
            </span>
          </div>

          <div className="kpi-card">
            <h3>Active Anomalies</h3>
            <div className="value danger">{activeAnomalies.length}</div>
            <span className="status critical">Requires Action</span>
          </div>
        </div>

        {/* ACTION BAR */}
        <div className="action-bar">
          <div className="tabs">
            <button
              className={`tab-btn ${
                activeTab === "charts" ? "active" : ""
              }`}
              onClick={() => setActiveTab("charts")}
            >
              Analytics
            </button>
            <button
              className={`tab-btn ${
                activeTab === "table" ? "active" : ""
              }`}
              onClick={() => setActiveTab("table")}
            >
              Raw Data
            </button>
          </div>

          <div className="export-controls">
            <span>Export AI Report:</span>
            <button
              className="btn-outline"
              onClick={() => handleExport("CSV")}
            >
              CSV
            </button>
            <button
              className="btn-primary"
              onClick={() => handleExport("PDF")}
            >
              PDF Analysis
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="content-panel">
          {/* CHART */}
          {activeTab === "charts" && (
            <div className="charts-wrapper">
              <div className="chart-container">
                <h3 className="section-title-small">
                  Total Dissolved Solids (TDS)
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={adaptedHistoricalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tds"
                      stroke="var(--danger-color)"
                      strokeWidth={2}
                      name="TDS (ppm)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TABLE */}
          {activeTab === "table" && (
            <div className="table-wrapper">
              <h3 className="section-title-small">
                Detailed Sensor Logs (TDS)
              </h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>TDS (ppm)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adaptedHistoricalData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.time}</td>
                      <td>{row.tds}</td>
                      <td>
                        <span
                          className={`status-badge ${row.status.toLowerCase()}`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ANOMALY HISTORY */}
        <section className="anomaly-section">
          <h1 className="section-title">Anomaly History</h1>
          <div className="anomaly-list">
            {activeAnomalies.map((a, i) => (
              <div key={i} className="anomaly-item">
                <div className="anomaly-icon">!</div>
                <div className="anomaly-info">
                  <h4>High TDS Level</h4>
                  <p>{a.time}</p>
                </div>
                <div
                  className={`anomaly-severity ${a.status.toLowerCase()}`}
                >
                  {a.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      </div>
      
    </div>
  );
}