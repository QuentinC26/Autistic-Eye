import './App.css'
// Access the data of the context you created
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Profile() {
  // Get the user from the context
  const { user } = useContext(AuthContext);
  return (
    <>
    {/* ? = the condition is True */}
    {/* : = the condition is False */}
     {user ? (
        <div>
        <a href="index.html" target="_blank">
          <h3>Mon Profil :</h3>
         <br></br>
          <h5>first_name :</h5>
          <h5>last_name :</h5>
          <h5>age :</h5>
          <h5>location :</h5>
          <h5>email :</h5>
          <h5>password :</h5>
        </a>
        </div>
        ) : (
          // Redirects the user to the Register/Login page
          <Navigate to="/Register_and_login" />
      )}
    </>
  )
}

export default Profile
