import { Link, useNavigate } from "react-router";

export default function HomePage() {
    const navigate = useNavigate();

    return (
    <div id='app-wrapper'>
      <div className='hero-container'>
        <div className='hero-content'>
          <h1 className='hero-title'>HydraLink</h1>
          <span className='hero-subTitle'>The ocean is 67% polluted by the skibidi trash</span>
          <span className='hero-description'>The ocean is 67% polluted by the skibidi trash</span>
        </div>

        <div className='hero-data'>
        <div className="hero-badge-container">
          <div className='hero-badge'>pH: <br /> 67%</div>
          <div className='hero-badge'>DO: <br /> 67%</div>
          <div className='hero-badge'>TDS: <br /> 67%</div>
        </div>
        <Link className="hero-button" to={"/"}>View water data</Link>
      </div>
      </div>
    </div>
  )
}