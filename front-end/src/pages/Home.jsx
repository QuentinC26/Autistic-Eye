import Autistic_Eye from '../assets/Autistic_Eye.png'
import './Home.css'
// manages navigation between application pages
import { BrowserRouter as Leader_Road, Road_Office, Single_Road, Link } from 'react-router-dom';
// manages Profile link
import Profile from './Profile.jsx'; 
// manages Register_and_login link
import Register_and_login from './Register_and_login.jsx';
// manages Article link
import Article from './Article';
// manages Community link
import Community from './Community';

function Home() {
  return (
    <>
    // manages navigation between application pages
    <Leader_Road>
      <nav>
      <ul>
      <li><Link to="/">Accueil</Link></li>
      <li><Link to="/Profile">Mon Profil</Link></li>
      <li><Link to="/Register_and_login">Inscription/Connexion</Link></li>
    </ul>
    {/* manages all road */} 
  <Road_Office>
    {/* manages Home road */}
    <Single_Road path="/" element={<Accueil />} />
    {/* manages My profile road */}
    <Single_Road path="/Profile" element={<Mon_Profil />} />
    {/* manages register and login road */}
    <Single_Road path="/Register_and_login" element={<Inscription_Connexion />} />
  </Road_Office>
  </nav>
      <div>
        <a href="index.html" target="_blank">
          {/* rel = nooperner noneferrer is a security for external links */}
          <img src={Autistic_Eye} className="logo Autistic Eye" alt="Autistic Eye logo" rel="noopener noreferrer" />
        </a>
      </div>
        <p>
          <h3>A VENIR</h3>
        </p>
        </Leader_Road> 
    </>
  )
}

export default Home
