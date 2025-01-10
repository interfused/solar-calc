import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import Glossary from "./pages/Glossary.tsx";
import Settings from "./pages/Settings.tsx";
import { GlobalStateProvider } from "./GlobalStateContext.tsx";

// Get the first segment of the path to use as the basename
const pathParts = window.location.pathname.split("/").filter(Boolean);
const basename = `/${pathParts.slice(0, 2).join("/")}`;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalStateProvider>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/glossary" element={<Glossary />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  </StrictMode>
);
