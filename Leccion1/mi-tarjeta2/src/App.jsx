// src/App.jsx
import './App.css'
import Card from './components/Card'

function App() {
  return (
    <div className="app">
      <Card 
        imagen="https://images.squarespace-cdn.com/content/v1/6118de68fcba4961cfbe3223/c57afbff-20f9-4ab5-8856-c29c258b3f88/Screenshot+2022-07-07+at+10.22.42.png"
        nombre="Andrea López"
        profesion="Desarrolladora Frontend"
        mensaje="Apasionada por el diseño web, el código limpio y la accesibilidad."
      />
    </div>
  )
}

export default App