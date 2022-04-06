import React from "react";
import { useAuth } from "../../contexts/hooks-export";
import { Link } from "react-router-dom";
import "./loginpage.css";
import { ToastContainer } from "react-toastify";

export const Login = () => {
  const { authState, authDispatch, login } = useAuth();

  return (
    <div className="flex">
      <div className="login-card">
        <h2 className="text-center">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <div className="pt-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abcd@gmail.com"
              className="input"
              required
              value={authState.email}
              onChange={(e) => {
                authDispatch({ type: "EMAIL", payload: e.target.value });
                authDispatch({
                  type: "ERROR",
                  payload: "",
                });
              }}
            />
            {!authState.email && (
              <p className="input-error">Please enter email address</p>
            )}
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
              required
              value={authState.password}
              onChange={(e) => {
                authDispatch({
                  type: "ERROR",
                  payload: "",
                });
                authDispatch({ type: "PASSWORD", payload: e.target.value });
              }}
            />
            {!authState.password && (
              <p className="input-error">Please enter password</p>
            )}
          </div>
          <div className="pt-1 pb-1 flex flex-start small-gap">
            <input type="checkbox" name="checkbox" id="checkbox" />
            <label htmlFor="checkbox">Remember me</label>
          </div>
          <div className="pb-1">
            <Link to="/login" className="link forgot-password-link">
              Forgot your Password ?
            </Link>
          </div>
          <button className="btn login-btn full-width">Login</button>
          &nbsp;
          <p
            className="flex outline-btn full-width"
            onClick={() => authDispatch({ type: "TEST_CREDENTIALS" })}
          >
            Login with test credentials
          </p>
          <h3 className="flex pt-1 input-error">{authState.errorMsg}</h3>
          <Link to="/signup" className="link signup-link">
            <div className="flex">
              Create new Account
              <span className="material-icons-outlined icon chevron-right">
                chevron_right
              </span>
            </div>
          </Link>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
