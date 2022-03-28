import React from "react";
import hero from "../../images/hero.svg";
import "./homepage.css";

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
      <button className="flex btn join-btn mx-auto">Join Now</button>
      <p className="signin-btn flex p-1">Already have an account ?</p>
    </div>
  );
};
