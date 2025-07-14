import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Citas from './pages/Citas';
import CitaDetalle from './pages/CitaDetalle';
import Paciente from './pages/Paciente';
import NuevaCita from './pages/NuevaCita'; // 👈 IMPORTANTE
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Plataforma de Citas Médicas</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/citas" element={<Citas />} />
        <Route path="/citas/:id" element={<CitaDetalle />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/nueva-cita" element={<NuevaCita />} /> {/* NUEVA RUTA */}
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </div>
  );
}

export default App;