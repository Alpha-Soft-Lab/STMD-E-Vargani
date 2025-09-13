import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { CreatorProvider } from "./context/CreatorContext.jsx";
import { toasterOptions } from "./utils/toastService.js"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CreatorProvider>
          <App />
           <Toaster {...toasterOptions} /> 
        </CreatorProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
