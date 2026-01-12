import { NavLink } from "react-router";

const Header = () => {
  return (
    <div className="header-wrapper">
      <div className="header-left">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
      </div>

      <div className="header-right">
        <NavLink to="/skibidi" className="nav-link">
          Skibidi
        </NavLink>

        <NavLink to="/about" className="nav-link">
          About us
        </NavLink>

        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
