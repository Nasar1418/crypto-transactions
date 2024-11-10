import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TransactionProvider } from "./context/TransactionContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <TransactionProvider>
    <Router>
      <StrictMode>
        <App />
      </StrictMode>
    </Router>
  </TransactionProvider>
);
