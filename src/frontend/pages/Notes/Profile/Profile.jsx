import React from "react";
import { useAuth } from "../../../contexts/auth-context";

export const Profile = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2 className="flex py-1">Hey, Rohit</h2>
      <button className="btn flex mx-auto" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
