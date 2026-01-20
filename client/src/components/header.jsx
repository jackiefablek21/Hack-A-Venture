import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { Pointer } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header-wrapper">
      <div className="header-left">
        <NavLink
          to="/"
          end
          className={({ isActive }) => isActive ? "nav-link active  hover-lift" : "nav-link  hover-lift"}
        >
          Map
        </NavLink>
        <NavLink
          to="/about"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active hover-lift" : "nav-link hover-lift"
          }
        >
          About us
        </NavLink>
      </div>
      <div className="header-user">
        {user?.role === "admin" && (
          <h1 style={{ pointerEvents: "none" }}>Admin mode</h1>
        )}

        {user?.role === "gov" && <button className="hover-lift" style={{color:"var(--white)",fontSize:"2rem", border:"2px solid white", background:"none", cursor:"pointer", padding:"0.5rem 2rem"}}>Gov panel</button>}
        {user ? (
          <div className="user-menu">
            <div className="profile-img-wrapper" onClick={() => setOpen(!open)}>
              <img
                className="profile-img hover-lift"
                src="../../public/assets/userDefault.png"
                alt="User avatar"
              />
            </div>

            {open && (
              <div className="dropdown-menu">
                <button onClick={() => navigate("/user")}>Profile</button>

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
          <NavLink to="/login" className="nav-link hover-lift">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
