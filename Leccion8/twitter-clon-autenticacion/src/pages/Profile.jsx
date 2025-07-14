const Profile = ({ user }) => {
  return (
    <div>
      <h1>Perfil</h1>
      {user ? <p>Usuario: {user.username}</p> : <p>No autenticado</p>}
    </div>
  );
};

export default Profile;