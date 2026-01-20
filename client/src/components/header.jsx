import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="header-user">
        {user ? (
          <div className="user-menu">
            <div
              className="profile-img-wrapper"
              onClick={() => setOpen(!open)}
            >
              <img
                className="profile-img"
                src='../../public/assets/userDefault.png'
                alt="User avatar"
              />
            </div>

            {open && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/user")}>
                  Profile
                </button>

                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </div>

    </header> 
  );
};

export default Header;
