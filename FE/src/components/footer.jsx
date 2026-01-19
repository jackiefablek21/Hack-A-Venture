import { Link } from "react-router"

const Footer = () => {
    return(
        <footer className="footer-wrapper">
            <div className="footer-left">
                <div className="footer-contact-info">
                    <span>Main gate- Cổng chính, 702 Đ. Nguyễn Văn Link, Tân Hưng, Quận 7, Hồ Chí Minh 700000</span>
                    <span>(+67) 6967 67 67</span>
                    <span style={{textDecoration:"underLine"}}>Call us</span>
                </div>
                <h1 style={{padding: "2rem 0rem"}}>HydraLink</h1>
            </div>
            <div className="footer-right">
                <div className="footer-section">
                    <h2 className="footer-section-title">Main pages</h2>
                    <Link to="/" className="footer-section-links">Home</Link>
                    <Link to="/" className="footer-section-links">Contact us</Link>
                    <Link to="/" className="footer-section-links">Contact us</Link>
                    <Link to="/" className="footer-section-links">Contact us</Link>
                </div>
                <div className="footer-section">
                    <h2 className="footer-section-title">Our team</h2>
                    <Link to="/" className="footer-section-links">Contact us</Link>
                    <Link to="/" className="footer-section-links">About us</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer