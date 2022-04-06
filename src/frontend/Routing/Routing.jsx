import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home/Home";
import { Login } from "../pages/Login/Login";
import { NoteHome } from "../pages/Notes/NoteHome/NoteHome";
import { NotFound } from "../pages/NotFound/NotFound";
import { Signup } from "../pages/Signup/Signup";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/notehome" element={<NoteHome />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
