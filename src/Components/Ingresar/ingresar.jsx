import React, { useState } from "react";
import "./ingresar.css";
import { Link, useNavigate } from "react-router-dom";

const Ingresar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMsg("Ingresa correo y contraseña.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/login", { // Ajustar URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Credenciales inválidas");
        setLoading(false);
        return;
      }

      // Guardar session
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      localStorage.setItem("token", data.token);

      if (data.usuario.role_id === 1) {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setErrorMsg("Error comunicándose con el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="ingresar">
      <div className="ingresar-container">
        <h1>Iniciar Sesión</h1>

        <div className="ingresar-fields">
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button onClick={handleLogin}>
          {loading ? "Cargando..." : "Continuar"}
        </button>

        <p className="ingresar-ingresar">
          ¿No tienes una cuenta?
          <Link to="/login" className="ingresar-link"> Crea una aquí</Link>
        </p>

        <div className="ingresar-agree">
          <input type="checkbox" required />
          <p>Acepto términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};

export default Ingresar;
