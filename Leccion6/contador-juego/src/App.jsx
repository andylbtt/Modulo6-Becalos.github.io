// src/App.jsx
import React, { useReducer, useRef, useEffect, useCallback } from 'react';

const initialState = {
  count: 0,
  history: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + action.value,
        history: [...state.history, `+${action.value} (Nuevo valor: ${state.count + action.value})`],
      };
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (Nuevo valor: ${state.count - 1})`],
      };
    case 'reset':
      return initialState;
    case 'undo':
      if (state.history.length === 0) return state;
      const lastChange = state.history[state.history.length - 1];
      const newCount = eval(`${state.count} - ${lastChange.startsWith('+') ? lastChange.slice(1).split(' ')[0] : `(${lastChange})`}`);
      return {
        count: newCount,
        history: state.history.slice(0, -1),
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, () => {
    const saved = localStorage.getItem('contadorState');
    return saved ? JSON.parse(saved) : initialState;
  });

  const inputRef = useRef(null);
  const incrementBtnRef = useRef(null);

  useEffect(() => {
    incrementBtnRef.current.focus();
  }, []);

  useEffect(() => {
    localStorage.setItem('contadorState', JSON.stringify(state));
  }, [state]);

  const handleIncrement = useCallback(() => {
    const value = parseInt(inputRef.current.value) || 1;
    dispatch({ type: 'increment', value });
    inputRef.current.value = '';
  }, []);

  const handleDecrement = useCallback(() => {
    dispatch({ type: 'decrement' });
  }, []);

  const handleUndo = () => {
    dispatch({ type: 'undo' });
  };

  return (
    <div className="container">
      <h2>Contador: {state.count}</h2>
      <input ref={inputRef} type="number" placeholder="Cantidad" />
      <button ref={incrementBtnRef} onClick={handleIncrement}>+</button>
      <button onClick={handleDecrement}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={handleUndo}>Deshacer</button>

      <h3>Historial de cambios:</h3>
      <ul>
        {state.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
}