import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from "react-leaflet";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import vietnamGeoJSON from "../data/vietnam-provinces.json";
import "../styles/map.css";
import "leaflet/dist/leaflet.css";

import { greenIcon, yellowIcon, redIcon } from "../data/mapIcons.js";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function MapPage() {
  const navigate = useNavigate();
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [missions, setMissions] = useState([]);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    severity: "medium", // Default value
    participantLimit: "10",
  });
  // Helper to handle manual typing
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { user } = useAuth();

  function getSensorIcon(sensor) {
    const avg = calculateAvgTds(sensor);

    if (avg === 0) return greenIcon; // Default for no data
    if (avg >= 500) return redIcon;
    if (avg >= 200) return yellowIcon;
    return greenIcon;
  }

  const handleGenerateQuests = async () => {
    setLoading(true);
    setMessage("Connecting to Gemini AI... this may take a minute.");

    try {
      const response = await fetch(
        "http://localhost:4000/api/ai/generateQuest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sensor: selectedSensor }),
        },
      );

      const data = await response.json();

      // Mapping AI fields to your Form State
      if (data && data.response) {
        const aiMission = data.response;

        setFormData({
          title: aiMission.title || "",
          description: aiMission.description || "",
          amount: aiMission.amount || "",
          severity: aiMission.severity || "medium",
          participantLimit: aiMission.participantLimit || "10",
        });
        setMessage("AI content loaded into form!");
      } else if (data.error) {
        setMessage(`Error: ${data.error}`);
      }

      if (response.ok) {
        setMessage(`Success! Generated ${data.count || ""} new missions.`);
      } else {
        setMessage(`Error: ${data.error || "Failed to generate"}`);
      }
    } catch (error) {
      console.error("Request failed:", error);
      setMessage("Server error. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCampaign = async (missionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this campaign?",
    );
    if (!confirmDelete) return;

    await fetch(`http://localhost:4000/api/missions/${missionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // remove from UI immediately
    setMissions((prev) => prev.filter((mission) => mission._id !== missionId));
  };

  useEffect(() => {
    async function fetchSensors() {
      try {
        const res = await fetch("http://localhost:4000/api/sensors");
        const data = await res.json();
        // console.log(data)
        setSensors(data);
      } catch (err) {
        console.error("Failed to fetch sensors", err);
      }
    }

    fetchSensors();
  }, []);

  // Helper to calculate average TDS
  function calculateAvgTds(sensor) {
    const dataRecords = sensor?.datas;
    if (!dataRecords || dataRecords.length === 0) return 0;

    const totalTds = dataRecords.reduce((sum, record) => {
      return sum + (record.metrics?.tds || 0);
    }, 0);

    return (totalTds / dataRecords.length).toFixed(2); // Rounds to 2 decimal places
  }

  return (
    <main className="map-wrapper">
      <div className="map-container">
        <MapContainer
          center={[10.798706817357974, 106.69496147238262]}
          maxZoom={20}
          zoom={12}
          maxBoundsViscosity={1.0}
          style={{ height: "80vh", borderRadius: "1rem" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON
            data={vietnamGeoJSON}
            style={{
              color: "#0F3663",
              weight: 1,
              fillColor: "none",
              fillOpacity: 0.2,
            }}
          />
          {sensors.map((sensor) => (
            <Marker
              key={sensor._id}
              position={[sensor.location.lat, sensor.location.lng]}
              icon={getSensorIcon(sensor)}
              eventHandlers={{
                click: async () => {
                  setSelectedSensor(sensor);

                  const res = await fetch(
                    `http://localhost:4000/api/missions/sensor/${sensor._id}`,
                  );
                  const data = await res.json();
                  setMissions(data);
                },
              }}
            />
          ))}
        </MapContainer>
      </div>

      {selectedSensor && (
        <div className="sensor-overlay">
          <aside className="sensor-panel">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <h2 style={{color:"var(--primary-color)"}}>Sensor: {selectedSensor.sensorId}</h2>

              <button
                style={{
                  padding: "0.5rem",
                  fontSize: "1.5rem",
                  margin: "0.5rem 0rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                className="close-btn hover-lift"
                onClick={() => setSelectedSensor(null)}
              >
                X
              </button>
            </div>
            <hr></hr>

            <div
              style={{
                fontSize: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <p>
                <strong>River:</strong> {selectedSensor.riverName}
              </p>
              <p>
                <strong>Latitude:</strong> {selectedSensor.location.lat}
              </p>
              <p>
                <strong>Longitude:</strong> {selectedSensor.location.lng}
              </p>
              <p>
                <strong>Average tds:</strong>{" "}
                {calculateAvgTds(selectedSensor)}{" "}
              </p>
              <p style={{ paddingBottom: "2rem" }}>
                <strong>Last Updated:</strong>{" "}
                {new Date(selectedSensor.lastUpdated).toLocaleString()}
              </p>
            </div>
            <h2 style={{ padding: "1rem 0rem" ,color:"var(--primary-color)"}}>Missions</h2>
            <hr></hr>

            {missions.length === 0 && (
              <p>No active missions for this sensor.</p>
            )}

            <ul className="side-mission-list">
              {missions.map((mission) => (
                <li key={mission._id} className="mission-card">
                  <div style={{ display: "flex" }}>
                    <div className="mission-meta">
                      <h4>{mission.title}</h4>
                      <p>{mission.description}</p>
                      <span className={`severity ${mission.severity}`}>
                        Serverity: {mission.severity.toUpperCase()}
                      </span>
                      <span className="mission-reward">
                        {" "}
                        Reward:{mission.amount} HL
                      </span>
                      <span className="mission-status">
                        Status: {mission.status.toUpperCase()}
                      </span>
                    </div>

                    <button
                      className="detail-button hover-lift"
                      onClick={() => navigate(`/quests/${mission._id}`)}
                    >
                      Details
                    </button>

                    {user?.role === "admin" && (
                      <>
                        <button
                          className="delete-button hover-lift"
                          onClick={() => handleDeleteCampaign(mission._id)}
                        >
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
              {(user?.role === "ngo" || user?.role === "admin") && (
                <button
                  className="create-campaign-btn hover-lift"
                  onClick={() => setShowCreateCampaign(true)}
                >
                  + Create Campaign
                </button>
              )}
            </ul>
          </aside>

          {showCreateCampaign && (
            <div
              className="sensor-overlay"
              onClick={() => setShowCreateCampaign(false)}
            >
              <aside
                className="sensor-panel"
                onClick={(e) => e.stopPropagation()}
              >
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <h2>Create Campaign</h2>
                     <button
                        style={{
                        padding: "0.5rem",
                        fontSize: "1.5rem",
                        margin: "0.5rem 0rem",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        }}
                        className="close-btn hover-lift"
                        onClick={() => setShowCreateCampaign(false)}
                    >
                        X
                    </button>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const payload = {
                      sensor: selectedSensor._id,
                      title: formData.title,
                      description: formData.description,
                      amount: Number(formData.amount),
                      severity: formData.severity,
                      participantLimit: formData.participantLimit,
                      expiresAt: e.target.expiresAt.value || null,
                    };

                    await fetch("http://localhost:4000/api/missions", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                      },
                      credentials: "include",
                      body: JSON.stringify(payload),
                    });

                    setShowCreateCampaign(false);
                    alert("Campaign created!");
                  }}
                >
                  <label>
                    Title
                    <input
                      className="create-input"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Description
                    <textarea
                      className="create-input"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Reward Amount
                    <input
                      className="create-input"
                      name="amount"
                      type="number"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Severity
                    <select
                      className="create-select"
                      name="severity"
                      value={formData.severity}
                      onChange={handleChange}
                      required
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </label>

                  <label>
                    Participants
                    <input
                      className="create-input"
                      name="participantLimit"
                      value={formData.participantLimit}
                      onChange={handleChange}
                      required
                    />
                  </label>

                  <label>
                    Expiration Date
                    <input name="expiresAt" type="date"  className="create-select" />
                  </label>

                  <button  style={{cursor:"pointer"}} type="submit" className="create-button hover-lift">Create</button>
                  <button style={{cursor:"pointer"}} 
                  className="generate-button hover-lift"
                    type="button"
                    onClick={handleGenerateQuests}
                    disabled={loading}
                  >
                    {loading
                      ? "AI is Generating..."
                      : "Generate Misson Content"}
                  </button>
                  {message && (
                    <p
                      style={{
                        marginTop: "15px",
                        color: message.includes("Error") ? "red" : "green",
                      }}
                    >
                      {message}
                    </p>
                  )}
                </form>
              </aside>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
