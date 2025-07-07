// src/App.jsx
import { useState } from 'react';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';

function Mensaje({ texto, tipo }) {
  const estilos = {
    color: tipo === 'exito' ? '#155724' : '#721c24',
    backgroundColor: tipo === 'exito' ? '#d4edda' : '#f8d7da',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    border: tipo === 'exito' ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
    marginTop: '1rem',
    textAlign: 'center'
  };

  return (
    <AnimatePresence>
      <motion.p
        key={texto}
        style={estilos}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.4 }}
      >
        {texto}
      </motion.p>
    </AnimatePresence>
  );
}

function Entrada({ onGuess, intentosRestantes }) {
  const [valor, setValor] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    const numero = parseInt(valor);
    if (!isNaN(numero)) {
      onGuess(numero);
    }
    setValor('');
  };

  return (
    <form onSubmit={manejarEnvio} className="entrada-form">
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Ingresa un número del 1 al 100"
      />
      <button type="submit" disabled={intentosRestantes <= 0}>Adivinar</button>
      <p>Intentos restantes: {intentosRestantes}</p>
    </form>
  );
}

function Historial({ historial }) {
  return (
    <div className="historial">
      <h2>Historial de Intentos</h2>
      <ul>
        {historial.map((item, index) => (
          <li key={index}>Intento #{index + 1}: {item}</li>
        ))}
      </ul>
    </div>
  );
}

function AnimacionFinal({ exito }) {
  return (
    <motion.div
      className="confetti"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {exito ? '🎉 ¡Ganaste! 🎉' : '😢 Fin del juego'}
    </motion.div>
  );
}

function App() {
  const [numeroSecreto, setNumeroSecreto] = useState(Math.floor(Math.random() * 100) + 1);
  const [intentos, setIntentos] = useState(0);
  const [mensaje, setMensaje] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [exito, setExito] = useState(false);

  const intentosMaximos = 10;
  const intentosRestantes = intentosMaximos - intentos;

  const verificarNumero = (num) => {
    if (juegoTerminado) return;

    setIntentos(prev => prev + 1);
    setHistorial(prev => [...prev, num]);

    if (num === numeroSecreto) {
      setMensaje({ texto: `¡Correcto! Lo lograste en ${intentos + 1} intentos.`, tipo: 'exito' });
      setJuegoTerminado(true);
      setExito(true);
    } else if (intentos + 1 >= intentosMaximos) {
      setMensaje({ texto: `¡Oh no! Se acabaron los intentos. El número era ${numeroSecreto}.`, tipo: 'error' });
      setJuegoTerminado(true);
      setExito(false);
    } else if (num < numeroSecreto) {
      setMensaje({ texto: 'El número es más alto.', tipo: 'error' });
    } else {
      setMensaje({ texto: 'El número es más bajo.', tipo: 'error' });
    }
  };

  const reiniciarJuego = () => {
    setNumeroSecreto(Math.floor(Math.random() * 100) + 1);
    setIntentos(0);
    setMensaje(null);
    setHistorial([]);
    setJuegoTerminado(false);
    setExito(false);
  };

  return (
    <div className="contenedor pastel">
      <h1>🎯 Adivina el Número</h1>
      <Entrada onGuess={verificarNumero} intentosRestantes={intentosRestantes} />
      {mensaje && <Mensaje texto={mensaje.texto} tipo={mensaje.tipo} />}
      <Historial historial={historial} />
      <AnimatePresence>
        {juegoTerminado && <AnimacionFinal exito={exito} />}
      </AnimatePresence>
      {juegoTerminado && <button onClick={reiniciarJuego}>Jugar de Nuevo</button>}
    </div>
  );
}

export default App;