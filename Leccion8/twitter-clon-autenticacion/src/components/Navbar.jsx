import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#1da1f2", textAlign: "center" }}>
      <Link to="/" style={{ marginRight: "1rem", color: "white", textDecoration: "none" }}>Inicio</Link>
      <Link to="/login" style={{ marginRight: "1rem", color: "white", textDecoration: "none" }}>Login</Link>
      <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Perfil</Link>
    </nav>
  );
};

export default Navbar;