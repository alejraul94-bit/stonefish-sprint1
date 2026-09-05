import { useState } from "react";

export default function Login({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (user === "admin" && pass === "1234") {
      onLogin();
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Login - Stone Fish</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario:</label><br />
          <input value={user} onChange={(e) => setUser(e.target.value)} />
        </div>

        <div style={{ marginTop: 10 }}>
          <label>Contraseña:</label><br />
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button style={{ marginTop: 10 }} type="submit">
          Iniciar sesión
        </button>
      </form>

      <p style={{ marginTop: 10, fontSize: 12 }}>
        Tip: usuario <b>admin</b> / contraseña <b>1234</b>
      </p>
    </div>
  );
}