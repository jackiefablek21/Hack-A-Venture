import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  console.log(user)

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
        

        <NavLink to="/about" className="nav-link">
          About us
        </NavLink>

        <NavLink to="/contact" className="nav-link">
          SDG 6
        </NavLink>
      </div>
      <div>
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
        {user? `${user.email}`:'no'}
      <button onClick={() => logout()}>logout</button>
      </div>
      
    </header> 
  );
};

export default Header;
