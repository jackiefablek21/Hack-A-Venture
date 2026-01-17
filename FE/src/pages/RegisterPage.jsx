import { useState } from "react";
import "../styles/register.css";
import { useNavigate } from "react-router";

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register data:", form);
    // later: POST /api/users
  };

  return (
    <main className="register-wrapper">
      <div className="register-container">
        <h2>Register</h2>

        <form id="register-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              className="register-input"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input
              className="register-input"
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <span>Already have an account? <button className="login-nav-button" onClick={() => {navigate("/login")}} >Login!!</button></span>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}