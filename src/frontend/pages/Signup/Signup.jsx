import React from "react";
import "../Login/loginpage.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/hooks-export";

export function Signup() {
  const { authState, authDispatch, signup } = useAuth();

  return (
    <div className="flex">
      <div className="login-card">
        <h2 className="text-center">Signup</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            signup();
          }}
        >
          <div className="pt-1">
            <label htmlFor="email">Email</label>
            <br />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abcd@gmail.com"
              className="input"
              value={authState.email}
              required
              onChange={(e) => {
                authDispatch({
                  type: "ERROR",
                  payload: "",
                });
                authDispatch({ type: "EMAIL", payload: e.target.value });
              }}
            />
          </div>
          <div className="pt-1">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="input"
              value={authState.password}
              required
              onChange={(e) => {
                authDispatch({
                  type: "ERROR",
                  payload: "",
                });
                authDispatch({ type: "PASSWORD", payload: e.target.value });
              }}
            />
          </div>
          <div className="pt-1 pb-1">
            <input type="checkbox" name="checkbox" id="checkbox" required />
            &nbsp;
            <label htmlFor="checkbox">I accept all terms & conditions</label>
          </div>
          <button className="btn login-btn full-width">Create Account</button>
          <h3 className="flex pt-1 input-error">{authState.errorMsg}</h3>
          <Link to="/login" className="link login-link">
            <div className="flex small-gap">
              Already have an account
              <span className="material-icons-outlined icon chevron-right">
                chevron_right
              </span>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}
