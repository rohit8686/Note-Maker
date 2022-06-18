import React from "react";
import pagenotfound from "../../images/pagenotfound.png";
import "./notfound.css";

export const NotFound = () => {
  return (
    <>
      <h1 className="text-center">Page not found</h1>
      <img src={pagenotfound} alt="page-not-found" className="pagenotfound" />
    </>
  );
};
