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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const data = await res.json();
      console.log("User created:", data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <main className="register-wrapper">
      <div className="register-container">
        <h2>Register</h2>

        <form id="register-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
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
              required
              minLength={8}
              maxLength={20}
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