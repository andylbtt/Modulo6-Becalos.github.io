import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username);
    navigate("/");
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;