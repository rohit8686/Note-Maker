import React from "react";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../../contexts/hooks-export";

export const Profile = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2 className="flex py-1">Hey, Rohit</h2>
      <button className="btn flex mx-auto" onClick={logout}>
        Logout
      </button>
      <ToastContainer />
    </div>
  );
};
