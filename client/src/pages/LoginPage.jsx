import { useState } from "react";
import "../styles/login.css"
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";


export default function LoginPage() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      login(data.user);

      console.log("Logged in user:", data);
      alert("Login successful!");
    } catch (err) {
      console.error(err);
    }
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
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="login-password">Password:</label>
            <input
              className="login-input"
              name="login-password"
              id="login-password"
              placeholder="Password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
          
          <span>Don't have an account? <button className="register-nav-button" onClick={() => {navigate("/register")}} >Create one!!</button></span>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </main>
  );
}
