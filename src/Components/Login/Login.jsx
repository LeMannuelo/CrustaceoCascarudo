import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const reglas = {
    largo: password.length >= 8,
    mayus: /[A-Z]/.test(password),
    numero: /\d/.test(password),
  };

  const cumpleTodo = reglas.largo && reglas.mayus && reglas.numero;

  const handleRegister = async () => {
    if (!name || !email || !password || !repeatPassword) {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

    if (!cumpleTodo) {
      setErrorMsg("La contraseña no cumple los requisitos");
      return;
    }

    if (password !== repeatPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/auth/register", { // Ajustar URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message || "Error al registrarse");
        setLoading(false);
        return;
      }

      alert("Cuenta creada con éxito");
      navigate("/ingresar");

    } catch (err) {
      setErrorMsg("Error conectando con el servidor");
    }

    setLoading(false);
  };

  return (
    <div className="login">
      <div className="login-container">
        <h1>Registrarse</h1>

        <div className="login-fields">

          <input 
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          {/* Reglas dinámicas */}
          <div className="password-rules">
            <p className={reglas.largo ? "ok" : ""}>
              {reglas.largo ? "✔" : "-"} Mínimo 8 caracteres
            </p>
            <p className={reglas.mayus ? "ok" : ""}>
              {reglas.mayus ? "✔" : "-"} Una letra mayúscula
            </p>
            <p className={reglas.numero ? "ok" : ""}>
              {reglas.numero ? "✔" : "-"} Un número
            </p>
          </div>

          <input 
            type="password"
            placeholder="Repite la contraseña"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button onClick={handleRegister}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>

        <p className="login-login">
          ¿Ya tienes una cuenta?
          <Link to="/ingresar" className="login-link"> Ingresa aquí</Link>
        </p>

        <div className="login-agree">
          <input type="checkbox" required />
          <p>Acepto términos y condiciones</p>
        </div>

      </div>
    </div>
  );
};

export default Login;
