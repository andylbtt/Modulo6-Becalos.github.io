const Home = ({ user, logout }) => {
  return (
    <div>
      <h1>Bienvenido a Twitter Clon</h1>
      {user && (
        <>
          <p>Hola, {user.username}!</p>
          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
};

export default Home;