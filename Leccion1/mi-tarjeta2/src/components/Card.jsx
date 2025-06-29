// src/components/Card.jsx
import './Card.css';

function Card({ imagen, nombre, profesion, mensaje }) {
  return (
    <div className="page-container">
      <h1 className="page-title">Mi Tarjeta de Presentación</h1>
      <div className="card">
        <img src={imagen} alt="Foto de perfil" className="card-img" />
        <h2>{nombre}</h2>
        <h3>{profesion}</h3>
        <p>{mensaje}</p>
      </div>
    </div>
  );
}

export default Card;