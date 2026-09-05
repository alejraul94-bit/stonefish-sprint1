import React, { useState } from "react";
import Login from "./Login.jsx";
import Productos from "./Productos.jsx";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      {isLoggedIn ? (
        <Productos onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}
    </div>
  );
}