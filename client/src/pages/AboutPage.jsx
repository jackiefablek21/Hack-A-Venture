import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import "../styles/about.css";

export default function HomePage() {
  const navigate = useNavigate();

  const data = [
    {
      deviceId: "water-node-11",
      location: {
        lat: 10.762622,
        lng: 106.660172,
      },
      timestamp: "2026-01-12T13:45:30Z",
      metrics: {
        ph: 7.2,
        turbidity: 3.8,
        waterLevel: 1.45,
        temperature: 26.9,
        do: 6.5,
        tds: 367,
      },
      status: "normal",
    },
  ];

  const [valuePH, setValuepH] = useState(data[0].metrics.ph);
  const [valueDO, setValueDO] = useState(data[0].metrics.do);
  const [valueTDS, setValueTDS] = useState(data[0].metrics.tds);

  return (
    <div className="app-wrapper">
      <div className={`hero-container`}>
        <div className="hero-content">
          <h1 className="hero-title">HydraLink</h1>
          <span className="hero-subTitle">
            Protecting Our Rivers, One Sensor at a Time
          </span>
          <span className="hero-description">
            HydraLink connects real-time water quality sensors with communities
            and decision-makers to detect pollution early, protect ecosystems,
            and drive meaningful environmental action.
          </span>
        </div>

        <div className="hero-data">
          <div className="hero-badge-container">
            <div className="hero-badge">
              pH: <br />{" "}
              <span style={{ color: "var(--danger-color)" }}>
                {valuePH}
              </span>{" "}
            </div>
            <div className="hero-badge">
              DO: <br />{" "}
              <span style={{ color: "var(--primary-color)" }}>
                {valueDO}
              </span>{" "}
            </div>
            <div className="hero-badge">
              TDS: <br />{" "}
              <span style={{ color: "var(--danger-color)" }}>
                {valueTDS}
              </span>{" "}
            </div>
          </div>
          <Link className="hero-button hover-lift" to={"/"}>
            View water data
          </Link>
        </div>
      </div>

      <section className="why-section">
        <h1 className="section-title">Why it matters</h1>
        <div className="section-wrapper">
          <p className="section-text">
            Water pollution often remains undetected until it causes serious
            environmental and public health damage. Rivers support ecosystems,
            agriculture, and daily human life, yet traditional monitoring
            methods are infrequent and reactive.
            <br></br>
            <br></br>
            <span
              style={{ color: "var(--primary-color)", fontStyle: "italic" }}
            >
              HydraLink
            </span>{" "}
            provides continuous, real-time water quality monitoring through
            connected sensors, enabling early detection of pollution, greater
            transparency, and faster, data-driven responses to help protect
            waterways for present and future generations.
          </p>
        </div>
      </section>

      <section className="goal-section">
        <h1 className="section-title">Our goals</h1>
        <div className="section-wrapper">
          <p className="section-text">
            <span
              style={{ color: "var(--primary-color)", fontStyle: "italic" }}
            >
              HydraLink
            </span>{" "}
            aims to improve water safety by delivering reliable, real-time water
            quality data through a network of connected sensors.
            <br></br>
            <br></br>
            <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>
              Our Goal
            </span>{" "}
            is to empower communities, researchers, and decision-makers with
            transparent insights, support early detection of pollution events,
            and encourage proactive environmental protection through accessible
            and data-driven monitoring solutions.
          </p>
        </div>
      </section>

      <section className="action-section">
        <h4 className="action-title" style={{fontSize:"2rem"}}>Clean Water Starts With <i style={{fontSize:"2.5rem"}}>YOUR</i>  Action</h4>
        <button
          className="action-button hover-lift"
          onClick={() => {
            navigate("/");
          }}
        >
          Join us
        </button>
      </section>
    </div>
  );
}
