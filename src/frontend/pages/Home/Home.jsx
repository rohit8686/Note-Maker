import React from "react";
import hero from "../../images/hero.svg";
import "./homepage.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <img src={hero} className="hero-img mx-auto" alt="hero" />
      <h1 className="text-center hero-text mx-auto pt-1">
        Your modern <span className="colored-text">Note Taking App</span>
      </h1>
      <p className="text-center hero-desc mx-auto p-1">
        Manage your daily tasks and workflow in a modern way and boost your
        efficiency without any efforts.
      </p>
      <div className="flex gap">
        <Link to="/signup" className="link">
          <button className="flex btn join-btn mx-auto">Join Now</button>
        </Link>
        <Link to="/notehome" className="link">
          <button className="flex btn notes-btn mx-auto">Take Notes</button>
        </Link>
      </div>
      <Link to="/login" className="link">
        <p className="signin-btn flex p-1">Already have an account ?</p>
      </Link>
    </div>
  );
};
