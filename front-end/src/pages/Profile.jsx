import './App.css'
// Access the data of the context you created
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Profile() {
  // Get the user, accesToken and loading from the context
  const { user, accessToken, loading } = useContext(AuthContext);
  // Will store profile data received from the API
  const [profile, setProfile] = useState(null);
  // Will be used to display a message in case of a problem
  const [error, setError] = useState(null);

  // This code runs after the component is initially rendered.
    useEffect(() => {
      // It does nothing if the user or token is not yet available
      if (!user || !accessToken) {
        return;
      }

      console.log("Token utilisé pour fetchProfile :", accessToken);

      const fetchProfile = async () => {
        try {
          const response = await fetch("http://localhost:8000/members/profile/", {
          method: "GET",
          headers: {
            Authorization: `Token ${accessToken}`,
            'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log("Profile:", data);
          setProfile(data);
        } catch (err) {
          console.error("Erreur de récupération du profil :", err);
          setError("Impossible de charger les infos du profil.");
        }
      };

      // Call the fetchProfile function
      fetchProfile();
      // Restart fetchProfile every time 'user' or 'accessToken' changes
    }, [user, accessToken]);

    // Prevents components from running too early
    if (loading) {
      return <p>Chargement des données utilisateur...</p>;
    } 

    // Prevent access to the profile if you are not logged in
    if (!user) {
      return <Navigate to="/Register_and_login" />;
    }

    // Inform the user that there has been a problem
    if (error) { 
      return <p>{error}</p>;
    }

    // Waiting state to let the user know the application is working
    if (!profile) {
      return <p>Chargement du profil...</p>;
    }

  return (
    <>
    {/* ? = the condition is True */}
    {/* : = the condition is False */}
     {user ? (
        <div>
        <a href="index.html" target="_blank">
          <h3>Mon Profil :</h3>
         <br></br>
          <h5>Prénom : {profile.first_name}</h5>
          <h5>Nom : {profile.last_name}</h5>
          <h5>Âge : {profile.age}</h5>
          <h5>Ville : {profile.location}</h5>
          <h5>Email : {profile.email}</h5>
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
