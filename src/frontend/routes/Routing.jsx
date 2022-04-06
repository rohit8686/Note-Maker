import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../../frontend/pages/Home/Home";
import { Login } from "../../frontend/pages/Login/Login";
import { NoteHome } from "../../frontend/pages/Notes/NoteHome/NoteHome";
import { NotFound } from "../../frontend/pages/NotFound/NotFound";
import { Signup } from "../../frontend/pages/Signup/Signup";

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
