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
// manages the content of Navigation.jsx
import Navigation from './Navigation'; 
// manages the content of VerifyEmail.jsx
import VerifyEmail from './VerifyEmail';
// manages the content of ForgotPassword.jsx
import ForgotPassword from './ForgotPassword';
// manages the content of ResetPassword.jsx
import ResetPassword from './ResetPassword';

function App() {
  return (
    <>
    {/* manages navigation between application pages*/}
    <Leader_Road>
    <Navigation />
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
    {/* manages the verify-email road */}
    <Single_Road path="/verify-email" element={<VerifyEmail />} />
    {/* manages the forgot password road */}
    <Single_Road path="/forgot-password" element={<ForgotPassword />} />
    {/* manages the reset password road */}
    <Single_Road path="/reset-password/:uid/:token" element={<ResetPassword />} />
    </Road_Office>
    </Leader_Road> 
    </>
  )
}

export default App
