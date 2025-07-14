import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Bienvenido</h2>
      <nav>
        <Link to="/citas">Ver Citas</Link> |{' '}
        <Link to="/paciente">Perfil del Paciente</Link> |{' '}
        <Link to="/nueva-cita">Agendar Cita</Link>
      </nav>
    </div>
  );
};

export default Home;