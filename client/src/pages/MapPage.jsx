import { MapContainer, TileLayer, Marker, GeoJSON, Popup } from "react-leaflet";
import { Link, useNavigate } from "react-router";
import { useEffect, useState} from "react";
import vietnamGeoJSON from "../data/vietnam-provinces.json";
import "../styles/map.css"
import "leaflet/dist/leaflet.css";

import { greenIcon, yellowIcon, redIcon } from "../data/mapIcons.js";
import { useAuth } from "../contexts/AuthContext.jsx";



export default function MapPage() {
    const navigate = useNavigate();
    const [sensors, setSensors] = useState([]);
    const [selectedSensor, setSelectedSensor] = useState(null);
    const [missions, setMissions] = useState([]);
    const [showCreateCampaign, setShowCreateCampaign] = useState(false);

    const { user } = useAuth();

    function getSensorIcon(sensor) {
        const dataRecords = sensor?.datas;

        // 1. Check if datas exists and has entries
        if (!dataRecords || dataRecords.length === 0) {
            return greenIcon; // Default icon if no data is available
        }

        // 2. Sum up all TDS values
        const totalTds = dataRecords.reduce((sum, record) => {
            return sum + (record.metrics?.tds || 0);
        }, 0);

        // 3. Calculate the average
        const averageTds = totalTds / dataRecords.length;

        console.log(`Average TDS for ${sensor.name || 'Sensor'}:`, averageTds);

        // 4. Return icon based on average
        if (averageTds >= 500) return redIcon;
        if (averageTds >= 200) return yellowIcon;
        return greenIcon;
    }

    const handleDeleteCampaign = async (missionId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to remove this campaign?"
        );
        if (!confirmDelete) return;

        await fetch(`http://localhost:4000/api/missions/${missionId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        // remove from UI immediately
        setMissions(prev =>
            prev.filter(mission => mission._id !== missionId)
        );
    };

    useEffect(() => {
        async function fetchSensors() {
            try {
                const res = await fetch("http://localhost:4000/api/sensors");
                const data = await res.json();
                console.log(data)
                setSensors(data);
            } catch (err) {
                console.error("Failed to fetch sensors", err);
            }
        }

        fetchSensors();
    }, []);

    return (
        <main className="map-wrapper">
            <div className="map-container">
                <MapContainer
                    center={[10.798706817357974, 106.69496147238262]}
                    zoom={14}
                    style={{ height: "80vh"  ,   borderRadius: "1rem" }}
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
                    {sensors.map(sensor => (
                        <Marker
                            key={sensor._id}
                            position={[sensor.location.lat, sensor.location.lng]}
                            icon={getSensorIcon(sensor)}
                            eventHandlers={{
                                click: async () => {
                                    setSelectedSensor(sensor);

                                    const res = await fetch(
                                        `http://localhost:4000/api/missions/sensor/${sensor._id}`
                                    );
                                    const data = await res.json();
                                    setMissions(data);
                                }
                            }}
                        />
                    ))}

                </MapContainer>
            </div>

            {selectedSensor && (
                <div className="sensor-overlay">
                    <aside className="sensor-panel">
                        <div style={{display:'flex',justifyContent:"space-between",alignItems:"center",gap:'1rem'}}>
                            <h2>Sensor: {selectedSensor.sensorId}</h2>
                            <button
                                style={{padding:"0.5rem", fontSize:"2rem"}}
                                className="close-btn"
                                onClick={() => setSelectedSensor(null)}
                            >
                                X
                            </button>
                        </div>
                        <div style={{fontSize:"1rem", display:'flex',flexDirection:"column",gap:"2rem"}}>
                            <p><strong>River:</strong> {selectedSensor.riverName}</p>
                            <p><strong>Latitude:</strong> {selectedSensor.location.lat}</p>
                            <p><strong>Longitude:</strong> {selectedSensor.location.lng}</p>
                            <strong>Last Updated:</strong>
                            {new Date(selectedSensor.lastUpdated).toLocaleString()}s
                        </div>
                        <h3 style={{padding: "1rem 0rem"}}>Missions</h3>

                        {missions.length === 0 && (
                            <p>No active missions for this sensor.</p>
                        )}

                        <ul className="mission-list">
                            {missions.map(mission => (
                                <li key={mission._id} className="mission-card">
                                    <div style={{display:"flex", justifyContent:'space-between'}}>
                                        <div>
                                            <h4>{mission.title}</h4>
                                            <p>{mission.description}</p>

                                            <div className="mission-meta">
                          <span className={`severity ${mission.severity}`}>
                            {mission.severity.toUpperCase()}
                          </span>
                                                <span>💰 {mission.amount}</span>
                                                <span>Status: {mission.status}</span>
                                            </div>
                                        </div>
                                        <button className="detail-button" onClick={() => navigate(`/quests/${mission._id}`)}>Campaign details</button>
                                        {user?.role === "admin" && (
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDeleteCampaign(mission._id)}
                                            >
                                                Remove campaign
                                            </button>
                                        )}
                                    </div>
                                </li>
                            ))}
                            {(user?.role === "ngo" || user?.role === "admin") && (
                                <button
                                    className="create-campaign-btn"
                                    onClick={() => setShowCreateCampaign(true)}
                                >
                                    + Create Campaign
                                </button>
                            )}
                        </ul>
                    </aside>

                    {showCreateCampaign && (
                        <div className="sensor-overlay" onClick={() => setShowCreateCampaign(false)}>
                            <aside
                                className="sensor-panel"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2>Create Campaign</h2>

                                <form
                                    onSubmit={async (e) => {
                                        e.preventDefault();

                                        const form = e.target;

                                        const payload = {
                                            missionId: `Q-${Date.now()}`,
                                            sensor: selectedSensor._id,
                                            title: form.title.value,
                                            description: form.description.value,
                                            amount: Number(form.amount.value),
                                            severity: form.severity.value,
                                            participantLimit: form.participantLimit.value,
                                            expiresAt: form.expiresAt.value || null
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
                                        console.log(payload)
                                        setShowCreateCampaign(false);
                                        alert("Campaign created!");
                                    }}
                                >
                                    <label>
                                        Title
                                        <input name="title" required />
                                    </label>

                                    <label>
                                        Description
                                        <textarea name="description" required />
                                    </label>

                                    <label>
                                        Reward Amount
                                        <input name="amount" type="number" required />
                                    </label>

                                    <label>
                                        Severity
                                        <select name="severity" required>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </label>

                                    <label>
                                        Participants
                                        <select name="participantLimit">
                                            <option value="10">10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                        </select>
                                    </label>

                                    <label>
                                        Expiration Date
                                        <input name="expiresAt" type="date" />
                                    </label>

                                    <button type="submit">Create</button>
                                </form>
                            </aside>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}