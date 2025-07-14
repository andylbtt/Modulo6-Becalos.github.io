import { Link } from 'react-router-dom';

const Citas = () => {
  const citas = [
    { id: 1, fecha: '2025-07-15', paciente: 'Juan Pérez' },
    { id: 2, fecha: '2025-07-16', paciente: 'María López' },
  ];

  return (
    <div>
      <h2>Lista de Citas</h2>
      <ul>
        {citas.map(cita => (
          <li key={cita.id}>
            <Link to={`/citas/${cita.id}`}>
              {cita.paciente} - {cita.fecha}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Citas;