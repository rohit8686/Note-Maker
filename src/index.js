import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider,
  AuthProvider,
  NoteProvider,
  EditProvider,
  ArchiveProvider,
  AsideSelectedProvider,
  TrashProvider,
  FilterProvider,
} from "./frontend/contexts/providers-export";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <NoteProvider>
            <FilterProvider>
              <EditProvider>
                <ArchiveProvider>
                  <TrashProvider>
                    <AsideSelectedProvider>
                      <App />
                    </AsideSelectedProvider>
                  </TrashProvider>
                </ArchiveProvider>
              </EditProvider>
            </FilterProvider>
          </NoteProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
