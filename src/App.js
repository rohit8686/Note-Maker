import { Route, Routes } from "react-router-dom";
import { useTheme } from "./frontend/contexts/theme-context";
import { Navbar } from "./frontend/Navbar/Navbar";
import { Home } from "./frontend/pages/Home/Home";
import { Login } from "./frontend/pages/Login/Login";
import { Archive } from "./frontend/pages/Notes/Archive/Archive";
import { NoteHome } from "./frontend/pages/Notes/NoteHome/NoteHome";
import { Signup } from "./frontend/pages/Signup/Signup";

function App() {
  const { darkTheme } = useTheme();
  return (
    <div className={`App ${darkTheme ? "dark" : "light"}`}>
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/notehome" element={<NoteHome />} />
      </Routes>
    </div>
  );
}

export default App;
