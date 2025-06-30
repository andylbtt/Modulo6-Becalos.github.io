// src/components/ListaDeCompras.jsx
import { useState, useEffect } from 'react';
import './ListaDeCompras.css';

function ListaDeCompras() {
  const [producto, setProducto] = useState('');
  const [lista, setLista] = useState(() => {
    const listaGuardada = localStorage.getItem('listaDeCompras');
    return listaGuardada ? JSON.parse(listaGuardada) : [];
  });

  useEffect(() => {
    localStorage.setItem('listaDeCompras', JSON.stringify(lista));
  }, [lista]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (producto.trim() === '') return;
    setLista([...lista, producto]);
    setProducto('');
  };

  const eliminarProducto = (indice) => {
    const nuevaLista = lista.filter((_, i) => i !== indice);
    setLista(nuevaLista);
  };

  return (
    <div className="contenedor">
      <h1>🛒 Lista de Compras</h1>
      <form onSubmit={manejarEnvio} className="formulario">
        <input
          type="text"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
          placeholder="Agregar producto"
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {lista.map((item, index) => (
          <li key={index}>
            {item}
            <button
              className="eliminar"
              onClick={() => eliminarProducto(index)}
              title="Eliminar"
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeCompras;