import { useTheme } from "./frontend/contexts/theme-context";
import { Navbar } from "./frontend/Navbar/Navbar";
import { Home } from "./frontend/pages/HomePage/Home";

function App() {
  const { darkTheme } = useTheme();
  return (
    <div className={`App ${darkTheme ? "dark" : "light"}`}>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
