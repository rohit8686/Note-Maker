import { Route, Routes } from "react-router-dom";
import { useTheme } from "./frontend/contexts/theme-context";
import { Navbar } from "./frontend/Navbar/Navbar";
import { Home } from "./frontend/pages/Home/Home";
import { Login } from "./frontend/pages/Login/Login";
import { NoteHome } from "./frontend/pages/Notes/NoteHome/NoteHome";
import { NotFound } from "./frontend/pages/NotFound/NotFound";
import { Signup } from "./frontend/pages/Signup/Signup";

function App() {
  const { darkTheme } = useTheme();
  return (
    <div className={`App ${darkTheme ? "dark" : "light"}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notehome" element={<NoteHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
