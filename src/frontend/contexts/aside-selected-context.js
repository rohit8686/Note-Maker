import { React, createContext, useContext, useState } from "react";

const AsideSelectedContext = createContext();
const useAsideSelected = () => useContext(AsideSelectedContext);

function AsideSelectedProvider({ children }) {
  const [asideSelected, setAsideSelected] = useState("note-home");

  return (
    <AsideSelectedContext.Provider value={{ asideSelected, setAsideSelected }}>
      {children}
    </AsideSelectedContext.Provider>
  );
}

export { AsideSelectedProvider, useAsideSelected };
