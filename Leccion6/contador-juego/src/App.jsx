// src/App.jsx
import { useReducer, useRef, useCallback, useEffect, useState } from "react";
import "./App.css";

const initialState = {
  count: 0,
  history: JSON.parse(localStorage.getItem("historial")) || [],
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + action.payload,
        history: [...state.history, `+${action.payload} (Nuevo valor: ${state.count + action.payload})`],
      };
    case "decrement":
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`],
      };
    case "reset":
      return initialState;
    case "undo":
      return {
        count: state.count + (state.history.at(-1)?.includes("-") ? 1 : -parseInt(state.history.at(-1))),
        history: state.history.slice(0, -1),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const incrementBtnRef = useRef(null);
  const [valor, setValor] = useState(1);

  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem("historial", JSON.stringify(state.history));
  }, [state.history]);

  const handleIncrement = useCallback(() => {
    dispatch({ type: "increment", payload: parseInt(valor) });
  }, [valor]);

  const handleDecrement = useCallback(() => {
    dispatch({ type: "decrement" });
  }, []);

  const handleUndo = useCallback(() => {
    dispatch({ type: "undo" });
  }, []);

  return (
    <div className="contenedor pastel">
      <h1>🧮 Contador con Hooks Avanzados</h1>
      <h2>Valor actual: {state.count}</h2>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        min="1"
      />
      <div className="botones">
        <button ref={incrementBtnRef} onClick={handleIncrement}>
          Incrementar
        </button>
        <button onClick={handleDecrement}>Decrementar</button>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
        <button onClick={handleUndo}>Deshacer</button>
      </div>
      <h3>Historial de cambios</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;