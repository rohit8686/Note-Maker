import { useTheme } from "./frontend/contexts/hooks-export";
import { Navbar } from "./frontend/Navbar/Navbar";
import { Routing } from "./frontend/Routing/Routing";

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
