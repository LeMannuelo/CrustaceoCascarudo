import React from 'react'
import "./ingresar.css"
import { Link } from "react-router-dom";

const ingresar = () => {
  return (
    <div className='ingresar'>
      <div className='ingresar-container'>
        <h1>Ingresar</h1>
        <div className='ingresar-fields'>
          <input type="text" placeholder='Correo' />
          <input type="text" placeholder='Contraseña'/>
        </div>
        <button>Continuar</button>
        <p className='ingresar-ingresar'>
          ¿No tienes una cuenta?
          <Link to="/login" className="ingresar-link"> Crea una aquí</Link>
        </p>
        <div className="ingresar-agree">
            <input type="checkbox" name='' id='' />
            <p>Al continuar acepto terminos y condiciones</p>
        </div>
      </div>
    </div>
  )
}

export default ingresar
        