import { useState } from "react";
import "../styles/login.css"
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", email);
    // later: POST /api/auth/login
  };

  return (
    <main className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} id="login-form">
          <div>
            <label htmlFor="login-email">Email:</label>
            <input
              className="login-input"
              name="login-email"
              id="login-email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="login-password">Password:</label>
            <input
              className="login-input"
              name="login-password"
              id="login-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <span>Don't have an account? <button className="register-nav-button" onClick={() => {navigate("/register")}} >Create one!!</button></span>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </main>
  );
}
