import './App.css'
// Access the data of the context you created
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  // Get the user from the context
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = () => {
    // To put the user on the home page
    navigate('/Register_and_login');
  };
  return (
    <>
    {/* ? = the condition is True */}
    {/* : = the condition is False */}
     {user ? (
        <div>
        <h3>Bienvenue sur Autistic Eye !!</h3>
        <br />
        <p>Voici les cinq post les plus récents :</p>
        <br />
        <br />
        <p>POST LES PLUS RECENTS</p>
        <br />
        <br />
        <p>Voici les cinq articles les plus récents :</p>
        <br />
        <br />
        <p>ARTICLE LES PLUS RECENTS</p>
        <br />
        </div>
        ) : (
        <div>
         <h3>Bienvenue sur Autistic Eye !!</h3>
         <br />
         <p>Autistic Eye est un réseau social communautaire qui réunit les personnes autistes et leurs proches. Son but est de combattre l'isolement des personnes autistes et de leur permettre de partager leurs expériences.</p>
         <br />
         <p>Les membres d'Autistic Eye ont un accès illimité à la partie Communauté, qui leur permet de partager leurs expériences, d'échanger entre eux et d'obtenir de l'aide. Pour vous donner un aperçu de cette section, voici le post le plus récent ci-dessous :</p>
         <br />
         <p>POST LE PLUS RECENT</p>
         <br />
         <p>L'autre partie de l'application est la section Article. Dans cette section, les membres d'Autistic Eye ont accès à toutes les ressources externes qui les concernent, comme les démarches administratives, les associations, et bien plus encore.</p>
         <br />
         <p>ARTICLE LE PLUS RECENT</p>
         <br />
         <p>Viens nous rejoindre en cliquant sur le boutton ci-dessous :</p>
         <br />
         <button onClick={handleRegister}>Inscription</button>
        </div>
      )}
    </>
  )
}

export default Home
