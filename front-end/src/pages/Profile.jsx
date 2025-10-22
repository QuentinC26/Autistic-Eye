import './App.css'
// Access the data of the context you created
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function Profile() {
  // Get the user, accesToken and loading from the context
  const { user, accessToken, loading, logoutUser } = useContext(AuthContext);
  // Will store profile data received from the API
  const [profile, setProfile] = useState(null);
  // Will be used to display a message in case of a problem
  const [error, setError] = useState(null);
  // Indicates whether you are in "edit" mode.
  const [isEditing, setIsEditing] = useState(false); 
  // Stores form fields (editable)
  const [formData, setFormData] = useState({});

  // This code runs after the component is initially rendered.
    useEffect(() => {
      // It does nothing if the user or token is not yet available
      if (!user || !accessToken) {
        return;
      }

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
          setProfile(data);
          // Prepare the data that will be editable, then send it.
          setFormData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            age: data.age || '',
            location: data.location || ''
          });
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
    
    // Manages local form updates as you type
    const ModidyData = (modifydata) => {
      const { name, value } = modifydata.target;
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value
      }));
    };

    // Manages submission and sending to the server (PATCH)
    const UpdateChange = async (update) => {
      update.preventDefault();
      try {
        const response = await fetch("http://localhost:8000/members/profile/update/", {
        method: "PATCH",
        headers: {
        Authorization: `Token ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour du profil.");
      } 

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
      console.log("Profil mis à jour avec succès !");
    } catch (err) {
      console.error("Erreur complète :", err);
      setError("Échec de la mise à jour du profil.");
    }
  };

   const DeleteAccount = async () => {
    // window.confirm() is a native JavaScript function that displays a dialog box with two buttons: ok and cancel
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/members/profile/delete/", {
        method: "DELETE",
        headers: {
          Authorization: `Token ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression du compte.");
      }

      alert("Compte supprimé avec succès.");
      logoutUser();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la suppression du compte.");
    }
  };
 
  return (
  <>
    {user ? (
      <div>
        <h3>Mon Profil :</h3>
        <br />
        <p>Voici vos informations personnelles :</p>
        {/* Display in reading mode (not editing) */}
        {!isEditing ? (
          <>
            <h4>Prénom : {profile.first_name}</h4>
            <h4>Nom : {profile.last_name}</h4>
            <h4>Âge : {profile.age}</h4>
            <h4>Ville : {profile.location}</h4>
            <h4>Email : {profile.email}</h4>
            <button onClick={() => setIsEditing(true)}>Modifier le profil</button>
          </>
        ) : (
          // Profile Edit Form
          <form onSubmit={UpdateChange}>
            <label>
              Prénom :
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={ModidyData}
              />
            </label>
            <br />
            <label>
              Nom :
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={ModidyData}
              />
            </label>
            <br />
            <label>
              Âge :
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={ModidyData}
              />
            </label>
            <br />
            <label>
              Ville :
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={ModidyData}
              />
            </label>
            <br />
            <br />
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={() => setIsEditing(false)}>Annuler</button>
          </form>
        )}
        <br />
        <br />
        {/* Button for delete the account */}
        <button type="button" onClick={DeleteAccount}>Supprimer le profil</button>
      </div>
    ) : (
      // If the user is not logged in, we redirect in Register_and_login page
      <Navigate to="/Register_and_login" />
    )}
  </>
);
}

export default Profile;
