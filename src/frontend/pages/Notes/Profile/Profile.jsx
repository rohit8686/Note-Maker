import React from "react";
import { useAuth } from "../../../contexts/auth-context";

export const Profile = () => {
  const {
    authState: { userData },
    logout,
  } = useAuth();

  return (
    <div>
      <h2 className="flex py-1">
        Hey, {userData.firstName} {userData.lastName}
      </h2>
      <button className="btn flex mx-auto" onClick={logout}>
        Logout
      </button>
    </div>
  );
};
