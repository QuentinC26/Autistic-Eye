import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Autistic_Eye from '../assets/Autistic_Eye.png';

function Navigation() {
  // user is the user already logged in and not currently logging in like loginuser
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // for logout the user
    logoutUser();
    // To put the user on the home page after logging out 
    navigate('/');
  };

  return (
    <nav> 
      <ul className="ul_list">
      <li><Link to="/">Accueil</Link></li>
      {/* Only a logged in user can view the My Profile page */}
      {user && (
        <li><Link to="/Profile">Mon profil</Link></li>
      )}
      {!user ? (
        <li><Link to="/Register_and_login">Inscription/Connexion</Link></li>
      ) : (
        <li><button onClick={handleLogout}>Déconnexion</button></li>
      )}
    </ul>
    <br></br>
    <div className="logo-container">
    <a href="index.html" target="_blank" rel="noopener noreferrer">
      <img src={Autistic_Eye} className="logo_of_website" alt="Autistic Eye logo" />
    </a>
    </div>
    <br></br>
    <ul className="ul_list_2">
    <li><Link to="/Article">Article</Link></li>
    <li><Link to="/Community">Communauté</Link></li>
    </ul>
    </nav>
  );
}

export default Navigation;
