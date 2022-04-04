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
import { AsideSelectedProvider } from "./frontend/contexts/aside-selected-context";
import { ArchiveProvider } from "./frontend/contexts/archive-context";
import { TrashProvider } from "./frontend/contexts/trash-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NoteProvider>
            <EditProvider>
              <ArchiveProvider>
                <TrashProvider>
                  <AsideSelectedProvider>
                    <App />
                  </AsideSelectedProvider>
                </TrashProvider>
              </ArchiveProvider>
            </EditProvider>
          </NoteProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
