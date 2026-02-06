import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { AlertProvider, ThemeProvider, PasswordProvider } from "./context";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <AlertProvider>
        <PasswordProvider>
          <App />
        </PasswordProvider>
      </AlertProvider>
    </ThemeProvider>
  </StrictMode>
);
