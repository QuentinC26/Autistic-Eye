import Autistic_Eye from '../assets/Autistic_Eye.png'
import './App.css'
// manages navigation between application pages
import { BrowserRouter as Leader_Road, Routes as Road_Office, Route as Single_Road, Link } from 'react-router-dom';
// manages Home link
import Home from './Home.jsx'
// manages Profile link
import Profile from './Profile.jsx'; 
// manages Register_and_login link
import Register_and_login, { Register, Login } from './Register_and_login';
// manages Article link
import Article from './Article';
// manages Community link
import Community from './Community';

function App() {
  return (
    <>
    {/* manages navigation between application pages*/}
    <Leader_Road>
      <nav> 
      <ul className="ul_list">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Profile">My Profile</Link></li>
      <li><Link to="/Register_and_login">Register/Login</Link></li>
    </ul>
    <br></br>
    <a href="index.html" target="_blank" rel="noopener noreferrer">
        {/* rel = nooperner noneferrer is a security for external links */}
        <img src={Autistic_Eye} className="logo Autistic Eye" alt="Autistic Eye logo" />
    </a>
    <br></br>
    <ul className="ul_list_2">
    <li><Link to="/Article">Article</Link></li>
    <li><Link to="/Community">Community</Link></li>
    </ul>
    <br></br>
    <br></br>
    <br></br>
     {/* manages all road */} 
    <Road_Office>
    {/* manages the Home road */}
    <Single_Road path="/" element={<Home />} />
    {/* manages My profile road */}
    <Single_Road path="/Profile" element={<Profile />} />
    {/* manages register and login road */}
    <Single_Road path="/Register_and_login" element={<Register_and_login />} />
    {/* manages the article road */}
    <Single_Road path="/Article" element={<Article />} />
    {/* manages the community road */}
    <Single_Road path="/Community" element={<Community />} />
    </Road_Office>
  </nav>
    </Leader_Road> 
    </>
  )
}

export default App
