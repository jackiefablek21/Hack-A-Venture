import { NavLink } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();


  return (
    <header className="header-wrapper">
      <div className="header-left">
        <NavLink
          to="/map"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Map
        </NavLink>
      </div>

      <div className="header-right">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink to="/about" className="nav-link">
          About us
        </NavLink>

        <NavLink to="/contact" className="nav-link">
          Contact
        </NavLink>
        
      </div>
      <div>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>

        {user? `${user.email} ${user.role}`:'no'}
        <button onClick={() => logout()}>logout</button>
      </div>

    </header> 
  );
};

export default Header;
