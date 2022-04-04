import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ThemeProvider } from "./frontend/contexts/theme-context";
import { AuthProvider } from "./frontend/contexts/auth-context";
import { BrowserRouter } from "react-router-dom";
import { NoteProvider } from "./frontend/contexts/note-context";
import { EditProvider } from "./frontend/contexts/edit-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NoteProvider>
            <EditProvider>
              <App />
            </EditProvider>
          </NoteProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
