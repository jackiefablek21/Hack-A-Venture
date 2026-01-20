import { useState } from "react";
import { Link } from "react-router";
import "../styles/home.css";

export default function HomePage() {
  const data = [
    {
      deviceId: "water-node-11",
      location: {
        lat: 10.762622,
        lng: 106.660172
      },
      timestamp: "2026-01-12T13:45:30Z",
      metrics: {
        ph: 7.2,
        turbidity: 3.8,
        waterLevel: 1.45,
        temperature: 26.9,
        do: 67,
        tds: 69,
      },
      status: "normal"
    },
  ]

  const [valuePH, setValuepH] = useState(data[0].metrics.ph)
  const [valueDO, setValueDO] = useState(data[0].metrics.do)
  const [valueTDS, setValueTDS] = useState(data[0].metrics.tds)

    return (
    <div className='app-wrapper'>
      <div className='hero-container'>
        <div className='hero-content'>
          <h1 className='hero-title'>HydraLink</h1>
          <span className='hero-subTitle'>The ocean is 67% polluted by the skibidi trash</span>
          <span className='hero-description'>The ocean is 67% polluted by the skibidi trash</span>
        </div>

        <div className='hero-data'>
        <div className="hero-badge-container">
          <div className='hero-badge'>pH: <br /> {valuePH} </div>
          <div className='hero-badge'>DO: <br /> {valueDO} </div>
          <div className='hero-badge'>TDS: <br /> {valueTDS} </div>
        </div>
        <Link className="hero-button" to={"/govfac"}>View water data</Link>
      </div>
      </div>

      <section className="why-section">
        <h1 className="section-title">Why it matters</h1>
        <div className="section-wrapper"></div>
      </section>

      <section className="goal-section">
        <h1 className="section-title">Our goals</h1>
        <div className="section-wrapper"></div>
      </section>
      
      <section className="action-section">
        <h1 className="action-title">Ocean is losing, <br /> send hep</h1>
        <button className="action-button">Join us</button>
      </section>
    </div>
  )
}
