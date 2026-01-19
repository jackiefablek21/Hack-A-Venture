import { useState } from "react";
import { Link } from "react-router"; // Assuming react-router-dom
import "../styles/govfacpage.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock Data for Charts and Tables (Time Series)
const historicalData = [
  { time: "08:00", ph: 7.1, turbidity: 3.5, do: 6.5, status: "Normal" },
  { time: "09:00", ph: 7.2, turbidity: 3.6, do: 6.4, status: "Normal" },
  { time: "10:00", ph: 7.1, turbidity: 3.8, do: 6.2, status: "Normal" },
  { time: "11:00", ph: 6.9, turbidity: 4.2, do: 5.8, status: "Warning" },
  { time: "12:00", ph: 6.5, turbidity: 5.5, do: 4.5, status: "Critical" }, // Anomaly
  { time: "13:00", ph: 6.8, turbidity: 4.8, do: 5.5, status: "Warning" },
  { time: "14:00", ph: 7.2, turbidity: 3.8, do: 6.7, status: "Normal" },
];

const anomalyHistory = [
  { id: 1, time: "2026-01-12 12:00", type: "Low pH / High Turbidity", location: "Factory Outlet A", severity: "Critical" },
  { id: 2, time: "2026-01-10 04:30", type: "Low Dissolved Oxygen", location: "River Node 11", severity: "Warning" },
];

export default function GovernmentPage() {
  const [activeTab, setActiveTab] = useState("charts"); // charts, table, report

  const handleExport = (format) => {
    // Logic to trigger AI report generation would go here
    alert(`Generating AI-based ${format} report...`);
  };

  return (
    <div className='gov-app-wrapper'>
      {/* Navigation / Header - Keeping consistency with Home */}
      <nav className="dashboard-nav">
        <h1 className='nav-title'>HydraLink <span className="badge">Gov/Factory Portal</span></h1>
      </nav>

      {/* Main Dashboard Content */}
      <div className="dashboard-container">
        
        {/* KPI Cards */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <h3>Avg pH (24h)</h3>
            <div className="value">7.1</div>
            <span className="status normal">Normal</span>
          </div>
          <div className="kpi-card">
            <h3>Avg Turbidity</h3>
            <div className="value">4.1 NTU</div>
            <span className="status warning">Elevated</span>
          </div>
          <div className="kpi-card">
            <h3>Avg D.O.</h3>
            <div className="value">6.1 mg/L</div>
            <span className="status normal">Healthy</span>
          </div>
          <div className="kpi-card">
            <h3>Active Anomalies</h3>
            <div className="value danger">1</div>
            <span className="status critical">Requires Action</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="action-bar">
          <div className="tabs">
            <button className={`tab-btn ${activeTab === 'charts' ? 'active' : ''}`} onClick={() => setActiveTab('charts')}>Analytics</button>
            <button className={`tab-btn ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}>Raw Data</button>
          </div>
          <div className="export-controls">
            <span>Export AI Report:</span>
            <button className="btn-outline" onClick={() => handleExport('CSV')}>CSV</button>
            <button className="btn-primary" onClick={() => handleExport('PDF')}>PDF Analysis</button>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-panel">
          
          {/* CHARTS SECTION */}
          {activeTab === 'charts' && (
            <div className="charts-wrapper">
              <div className="chart-container">
                <h3 className="section-title-small">Water Quality Trends (pH & DO)</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="ph" stroke="var(--primary-color)" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="do" stroke="var(--success-color)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="chart-container">
                <h3 className="section-title-small">Turbidity Levels</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="turbidity" stroke="var(--danger-color)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* TABLE SECTION */}
          {activeTab === 'table' && (
            <div className="table-wrapper">
              <h3 className="section-title-small">Detailed Sensor Logs</h3>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>pH</th>
                    <th>Turbidity</th>
                    <th>DO</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.time}</td>
                      <td>{row.ph}</td>
                      <td>{row.turbidity}</td>
                      <td>{row.do}</td>
                      <td>
                        <span className={`status-badge ${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ANOMALY HISTORY (Always Visible) */}
        <section className="anomaly-section">
          <h1 className="section-title" style={{textAlign: 'left', fontSize: '1.5rem'}}>Anomaly History</h1>
          <div className="anomaly-list">
            {anomalyHistory.map((anomaly) => (
              <div key={anomaly.id} className="anomaly-item">
                <div className="anomaly-icon">!</div>
                <div className="anomaly-info">
                  <h4>{anomaly.type}</h4>
                  <p>{anomaly.location} • {anomaly.time}</p>
                </div>
                <div className={`anomaly-severity ${anomaly.severity.toLowerCase()}`}>
                  {anomaly.severity}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}