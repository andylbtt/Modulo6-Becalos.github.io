import { useState } from 'react';

const NuevaCita = () => {
  const [nombre, setNombre] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cita registrada para ${nombre} el día ${fecha} a las ${hora}`);
    setNombre('');
    setFecha('');
    setHora('');
  };

  return (
    <div className="form-container">
      <h2>Agendar Nueva Cita</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Paciente:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label>Fecha:</label>
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />

        <label>Hora:</label>
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />

        <button type="submit">Registrar Cita</button>
      </form>
    </div>
  );
};

export default NuevaCita;