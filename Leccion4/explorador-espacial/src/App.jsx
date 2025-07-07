import { useState, useEffect, useMemo } from 'react';
import './App.css';

function App() {
  const [distancia, setDistancia] = useState(0);
  const [combustible, setCombustible] = useState(100);
  const [planetasVisitados, setPlanetasVisitados] = useState(
    JSON.parse(localStorage.getItem('bitacora')) || []
  );
  const [enVuelo, setEnVuelo] = useState(false);
  const [nuevoPlaneta, setNuevoPlaneta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');
  const [seleccionado, setSeleccionado] = useState(null);

  useEffect(() => {
    console.log('🚀 Panel montado: iniciando controles.');
    return () => console.log('🛑 Panel desmontado: apagando controles.');
  }, []);

  useEffect(() => {
    if (enVuelo) {
      const intervalo = setInterval(() => {
        setDistancia((d) => d + 10);
        setCombustible((c) => Math.max(c - 1, 0));
      }, 1000);
      return () => clearInterval(intervalo);
    }
  }, [enVuelo]);

  useEffect(() => {
    localStorage.setItem('bitacora', JSON.stringify(planetasVisitados));
  }, [planetasVisitados]);

  const eficiencia = useMemo(() => {
    return distancia > 0 ? (distancia / (100 - combustible)).toFixed(2) : '0';
  }, [distancia, combustible]);

  const nivelCombustible = () => {
    if (combustible > 60) return '🟩';
    if (combustible > 30) return '🟨';
    return '🟥';
  };

  const agregarPlaneta = (e) => {
    e.preventDefault();
    const nuevo = {
      nombre: nuevoPlaneta,
      descripcion,
      imagen
    };
    setPlanetasVisitados([...planetasVisitados, nuevo]);
    setNuevoPlaneta('');
    setDescripcion('');
    setImagen('');
  };

  const eliminarPlaneta = (index) => {
    const copia = [...planetasVisitados];
    copia.splice(index, 1);
    setPlanetasVisitados(copia);
    setSeleccionado(null);
  };

  return (
    <div className="panel">
      <h1>🛰️ Panel de Control Espacial</h1>
      <p>Distancia recorrida: {distancia} km</p>
      <p>Combustible restante: {combustible}% {nivelCombustible()}</p>
      <p>Eficiencia: {eficiencia} km por % de combustible</p>

      <button onClick={() => setEnVuelo(!enVuelo)}>
        {enVuelo ? 'Detener Vuelo' : 'Iniciar Vuelo'}
      </button>

      <form onSubmit={agregarPlaneta}>
        <h2>🪐 Registrar nuevo planeta</h2>
        <input
          type="text"
          placeholder="Nombre del planeta"
          value={nuevoPlaneta}
          onChange={(e) => setNuevoPlaneta(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción del planeta"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de imagen (opcional)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
        />
        <button type="submit">Añadir a bitácora</button>
      </form>

      <h2>📓 Bitácora de Planetas</h2>
      <ul>
        {planetasVisitados.map((planeta, i) => (
          <li key={i} onClick={() => setSeleccionado(planeta)} style={{ cursor: 'pointer' }}>
            {planeta.nombre}
          </li>
        ))}
      </ul>

      {seleccionado && (
        <div className="detalle-planeta">
          <h3>{seleccionado.nombre}</h3>
          <p>{seleccionado.descripcion}</p>
          {seleccionado.imagen && <img src={seleccionado.imagen} alt={seleccionado.nombre} style={{ maxWidth: '200px' }} />}
          <button onClick={() => eliminarPlaneta(planetasVisitados.indexOf(seleccionado))}>
            Eliminar planeta
          </button>
        </div>
      )}
    </div>
  );
}
export default App;