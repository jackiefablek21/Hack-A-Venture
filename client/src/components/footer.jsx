import { Link } from "react-router"

const Footer = () => {
    return(
        <footer className="footer-wrapper">
            <div className="footer-left">
                <div className="footer-contact-info">
                    <span>Main gate- Cổng chính, 702 Đ. Nguyễn Văn Link, Tân Hưng, Quận 7, Hồ Chí Minh 700000</span>
                    <span>(+84) 9167 67696</span>
                    <span className="hover-lift" style={{textDecoration:"underLine"}}>Call us</span>
                </div>
                <h1 style={{padding: "2rem 0rem"}}>HydraLink</h1>
            </div>
            <div className="footer-right">
                <div className="footer-section">
                    <h2 className="footer-section-title">Main pages</h2>
                    <Link to="/" className="footer-section-links hover-lift">Home</Link>
                    <Link to="/" className="footer-section-links hover-lift">Map</Link>
                    <Link to="/" className="footer-section-links hover-lift">SDG 6</Link>
                    <Link to="/" className="footer-section-links hover-lift">Support us</Link>
                </div>
                <div className="footer-section">
                    <h2 className="footer-section-title">Our team</h2>
                    <Link to="/about" className="footer-section-links hover-lift">Contact us</Link>
                    <Link to="/about" className="footer-section-links hover-lift">About us</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer