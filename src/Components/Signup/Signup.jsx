import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../config/api"; 

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  
  // Nuvoc estados
  const [showPassword, setShowPassword] = useState(false); 
  const [agreed, setAgreed] = useState(false); 

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Nuevo estado para el checkbox de términos
  const [agreed, setAgreed] = useState(false);

  // Estados para mostrar/ocultar contraseñas
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const reglas = {
    largo: password.length >= 8,
    mayus: /[A-Z]/.test(password),
    numero: /\d/.test(password),
  };

  const cumpleTodo = reglas.largo && reglas.mayus && reglas.numero;

  const handleRegister = async () => {
    // 1. Validar campos vacíos
    if (!name || !email || !password || !repeatPassword) {
      setErrorMsg("Todos los campos son obligatorios");
      return;
    }

    if (!agreed) {
      setErrorMsg("Debes aceptar los términos y condiciones");
      return;
    }

    if (!cumpleTodo) {
      setErrorMsg("La contraseña no cumple los requisitos");
      return;
    }

    // 4. Validar coincidencia de contraseñas
    if (password !== repeatPassword) {
      setErrorMsg("Las contraseñas no coinciden");
      return;
    }

    setErrorMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
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

          {/* Wrapper para Repetir Contraseña */}
          <div className="password-wrapper">
            <input 
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Repite la contraseña"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
            <span 
              className="password-toggle-icon" 
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
            >
              {showRepeatPassword ? <EyeOffIcon /> : <EyeIcon />}
            </span>
          </div>

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
          <input 
            type="checkbox" 
            id="terms" 
            checked={agreed} 
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms" style={{cursor: 'pointer'}}>
            Acepto términos y condiciones
          </label>
        </div>
      </div>
    </div>
  );
};

export default Login;