// src/components/ContadorDeTareas.jsx
import { useState, useEffect, useMemo } from 'react';
import './ContadorDeTareas.css';

function ContadorDeTareas() {
  const [tarea, setTarea] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [tareas, setTareas] = useState(() => {
    const guardadas = localStorage.getItem('tareas');
    return guardadas ? JSON.parse(guardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  const tiempoTotal = useMemo(() => {
    return tareas.reduce((acc, curr) => acc + parseInt(curr.tiempo), 0);
  }, [tareas]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (tarea.trim() === '' || tiempo.trim() === '') return;
    setTareas([...tareas, { nombre: tarea, tiempo, completada: false }]);
    setTarea('');
    setTiempo('');
  };

  const eliminarTarea = (indice) => {
    const nuevas = tareas.filter((_, i) => i !== indice);
    setTareas(nuevas);
  };

  const alternarCompletada = (indice) => {
    const nuevas = tareas.map((t, i) =>
      i === indice ? { ...t, completada: !t.completada } : t
    );
    setTareas(nuevas);
  };

  return (
    <div className="contenedor">
      <h1>⏱️ Contador de Tareas</h1>
      <form onSubmit={manejarEnvio} className="formulario">
        <input
          type="text"
          value={tarea}
          onChange={(e) => setTarea(e.target.value)}
          placeholder="Nombre de la tarea"
        />
        <input
          type="number"
          value={tiempo}
          onChange={(e) => setTiempo(e.target.value)}
          placeholder="Tiempo (minutos)"
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tareas.map((t, index) => (
          <li key={index} className={t.completada ? 'completada' : ''}>
            <span onClick={() => alternarCompletada(index)}>
              {t.nombre} - {t.tiempo} min
            </span>
            <button
              className="eliminar"
              onClick={() => eliminarTarea(index)}
              title="Eliminar"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>

      <h3>Total: {tiempoTotal} minutos</h3>
    </div>
  );
}

export default ContadorDeTareas;