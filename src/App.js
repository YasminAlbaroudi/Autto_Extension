import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { getWorkflows } from "./Firebase/Firestore";
import DashBoard from "./Workflow/Dashboard";
import { AuthProvider } from "./Context/AuthContext";
import DefaultRoute from "./DefaultRoute";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
function App() {

  return(
    <ThemeProvider
    theme={createTheme({
      palette: {
        primary: {
          main: "#ededed",
        },
        primaryDark: { main: "#464646" },
        secondary: { main: "#681897" },
        error: { main: "#d32f2f" },
        success: { main: "#2e7d32" },
      },
      typography: {
        fontFamily: "Open Sans, sans-serif",
      },
    })}
  >
    <AuthProvider>
      <DefaultRoute/>
    </AuthProvider> 
    </ThemeProvider>
    );
}

export default App;
