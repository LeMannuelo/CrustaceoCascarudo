import React from 'react'
import './NewsLetter.css'
import wp2 from '../Assets/wp2.jpg'

const NewsLetter = () => {
  return (
    <div 
      className="newsletter"
      style={{ backgroundImage: `url(${wp2})` }}
    >
      <h1>Recibe las últimas noticias del Crustáceo Cascarudo</h1>
      <p>Suscríbete y sé el primero en conocer nuestras nuevas delicias</p>
      <div className="newsletter-input">
        <input type="email" placeholder='Tu correo electrónico'/>
        <button>Suscribirme</button>
      </div>
    </div>
  )
}

export default NewsLetter
