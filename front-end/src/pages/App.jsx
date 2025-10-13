import Autistic_Eye from '../assets/Autistic_Eye.png'
import './App.css'
// manages navigation between application pages
import { BrowserRouter as Leader_Road, Routes as Road_Office, Route as Single_Road, Link } from 'react-router-dom';
// manages Profile link
import Profile from './Profile.jsx'; 
// manages Register_and_login link
import Register_and_login from './Register_and_login.jsx';
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
      <Link to="/">Home</Link>
      <Link to="/Profile">Mon Profile</Link>
      <Link to="/Register_and_login">Register/Login</Link>
    {/* manages all road */} 
  <Road_Office>
    {/* manages the Home road */}
    <Single_Road path="/" element={<Home />} />
    {/* manages My profile road */}
    <Single_Road path="/Profile" element={<Profile />} />
    {/* manages register and login road */}
    <Single_Road path="/Register_and_login" element={<Register_and_login />} />
  </Road_Office>
  </nav>
      <div>
        <a href="index.html" target="_blank" rel="noopener noreferrer">
          {/* rel = nooperner noneferrer is a security for external links */}
          <img src={Autistic_Eye} className="logo Autistic Eye" alt="Autistic Eye logo" />
        </a>
      </div>
    <div>
    <nav>
    <Road_Office>
    {/* manages the article road */}
    <Single_Road path="/Article" element={<Article />} />
    {/* manages the community road */}
    <Single_Road path="/Community" element={<Community />} />
  </Road_Office>
  </nav>
  </div>
    </Leader_Road> 
    </>
  )
}

export default App
