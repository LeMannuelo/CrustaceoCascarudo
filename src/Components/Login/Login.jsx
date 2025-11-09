import React from 'react'
import "./Login.css"

const Login = () => {
  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Registrarse</h1>
        <div className='login-fields'>
          <input type="text" placeholder='Tu nombre' />
          <input type="text" placeholder='Correo' />
          <input type="text" placeholder='Contraseña'/>
        </div>
        <button>Continuar</button>
        <p className='login-login'>Ya tiene una cuenta? <span>Ingrese aqui</span></p>
        <div className="login-agree">
          <input type="checkbox" name='' id='' />
          <p>Al continuar acepto terminos y condiciones</p>
        </div>

      </div>
      
    </div>
  )
}

export default Login
