import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Autistic_Eye from '../assets/Autistic_Eye.png';

function Navigation() {
  // user is the user already logged in and not currently logging in like loginuser
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/Profile');
  };

  const handleRegisterandlogin = () => {
    navigate('/Register_and_login');
  };

  const handleLogout = () => {
    // for logout the user
    logoutUser();
    // To put the user on the home page after logging out 
    navigate('/');
  };

  const handleArticle = () => {
    navigate('/Article');
  };

  const handleCommunity = () => {
    navigate('/Community');
  };

  return (
    <nav> 
      <ul className="ul_list">
      <li><button onClick={handleHome}>Accueil</button></li>
      {/* Only a logged in user can view the My Profile page */}
      {user && (
        <li><button onClick={handleProfile}>Mon Profil</button></li>
      )}
      {!user ? (
        <li><button onClick={handleRegisterandlogin}>Inscription/Connexion</button></li>
      ) : (
        <li><button onClick={handleLogout}>Déconnexion</button></li>
      )}
    </ul>
    <br></br>
    <div className="logo-container">
    <a href="/" target="_blank" rel="noopener noreferrer">
      <img src={Autistic_Eye} className="logo_of_website" alt="Autistic Eye logo" />
    </a>
    </div>
    <br></br>
    <ul className="ul_list_2">
    <li><button onClick={handleArticle}>Article</button></li>
    <li><button onClick={handleCommunity}>Communauté</button></li>
    </ul>
    </nav>
  );
}

export default Navigation;
