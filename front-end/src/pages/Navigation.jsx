import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Autistic_Eye from '../assets/Autistic_Eye.png';

function Navigation() {
  // user is the user already logged in and not currently logging in like loginuser
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Allows navigation to another page (for example, the Community page)...
  // ...this makes the code cleaner by avoiding the need for a navigation function for each page
  const handleNavigate = (path) => navigate(path);

  const handleLogout = () => {
    // for logout the user
    logoutUser();
    // To put the user on the home page after logging out 
    navigate('/');
  };

  return (
   <nav className="navbar">
    {/* Container in the left of the navbar */}
    <div className="navbar-left">
        <button onClick={() => handleNavigate('/')}>Accueil</button>
        {/* If user exists (logged in user), display the My Profile button */}
        {user && <button onClick={() => handleNavigate('/Profile')}>Mon Profil</button>}
        {/* Condition to display Registration/Login or Logout depending on whether the user is logged in or not */}
        {!user ? (
          <button onClick={() => handleNavigate('/Register_and_login')}>Inscription / Connexion</button>
        ) : (
          <button onClick={handleLogout}>Déconnexion</button>
        )}
      </div>
    <br></br>
     {/* Container in the center of the navbar */}
     <div className="navbar-center">
        <img
          src={Autistic_Eye}
          className="logo_of_website"
          alt="Autistic Eye logo"
          // Makes the logo clickable to return to home
          onClick={() => handleNavigate('/')}
          // Changes the cursor to indicate that the image is clickable
          style={{ cursor: 'pointer' }}
        />
      </div>
    <br></br>
    {/* Container in the right of the navbar */}
    <div className="navbar-right">
      <button onClick={() => handleNavigate('/Article')}>Article</button>
      <button onClick={() => handleNavigate('/Community')}>Communauté</button>
    </div>
   </nav>
  );
}

export default Navigation;
