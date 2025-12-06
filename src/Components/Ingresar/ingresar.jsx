import React, { useState } from "react";
import "./ingresar.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/api";

const Ingresar = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Nuevo estado para el checkbox de términos
  const [agreed, setAgreed] = useState(false);

  // Nuevo estado para alternar visibilidad de contraseña
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // 1. Validar campos vacíos
    if (!email || !password) {
      setErrorMsg("Ingresa correo y contraseña.");
      return;
    }

    if (!agreed) {
      setErrorMsg("Debes aceptar los términos y condiciones para continuar.");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
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
      localStorage.setItem("usuario", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      setErrorMsg("Error comunicándose con el servidor");
    }

    setLoading(false);
  };

  // Icono de Ojo (SVG)
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );

  // Icono de Ojo Tachado (SVG)
  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );

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

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"} 
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <button 
              type="button" 
              className="toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              )}
            </button>
          </div>
        </div>

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button onClick={handleLogin}>
          {loading ? "Cargando..." : "Continuar"}
        </button>

        <p className="ingresar-ingresar">
          ¿No tienes una cuenta?
          <Link to="/signup" className="ingresar-link"> Crea una aquí</Link>
        </p>

        <div className="ingresar-agree">
          <input 
            type="checkbox" 
            id="terms-login"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms-login" style={{cursor: 'pointer'}}>
            Acepto términos y condiciones
          </label>
        </div>
      </div>
    </div>
  );
};

export default Ingresar;