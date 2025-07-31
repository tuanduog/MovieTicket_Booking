// App.jsx
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppContent from "./AppContent.jsx";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
