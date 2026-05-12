import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

import "../auth.form.scss";
import { useState } from "react";

const login = () => {
  const { loading, handleLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nevigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    nevigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>loading.....</h1>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1> Login</h1>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="password"
              id="password"
              placeholder="Enter Password"
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>

        <p>
          New user do not have an account?{" "}
          <Link to={"/Register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default login;
