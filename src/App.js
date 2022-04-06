import { useTheme } from "./frontend/contexts/theme-context";
import { Navbar } from "./frontend/navbar/Navbar";
import { Routing } from "./frontend/routes/Routing";

function App() {
  const { darkTheme } = useTheme();
  return (
    <div className={`App ${darkTheme ? "dark" : "light"}`}>
      <Navbar />
      <Routing />
    </div>
  );
}

export default App;
