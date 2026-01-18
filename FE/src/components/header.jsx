import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header-wrapper">
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
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>

        <NavLink to="/about" className="nav-link">
          About us
        </NavLink>

        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
      </div>

      {user? "hi" : "sigma"}
    </header>
  );
};

export default Header;
