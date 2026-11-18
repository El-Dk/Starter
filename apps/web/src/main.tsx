import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import { router } from "./routes/router";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#3949ab" },
    background: { default: "#f5f6fa" }
  },
  shape: { borderRadius: 10 },
  typography: { fontFamily: '"Roboto", "Arial", sans-serif' }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
