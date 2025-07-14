import { useParams } from 'react-router-dom';

const CitaDetalle = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detalle de la Cita</h2>
      <p>Mostrando información para la cita con ID: {id}</p>
    </div>
  );
};

export default CitaDetalle;