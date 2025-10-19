import { useParams } from 'react-router-dom';
import { useState } from 'react';
// Library for making HTTP requests
import axios from 'axios';

function ResetPassword() {
  // Retrieves uid and token values ​​directly from the URL using useParams()
  const { uid, token } = useParams();
  // Creating non-fixed values for reset password forms
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (resetPassword) => {
    // Intercepts form submission to prevent page reload.
    resetPassword.preventDefault();
    try {
      // Sends a POST request to the Django REST Auth endpoint (/auth/password/reset/confirm/) with the required data
      await axios.post(`http://localhost:8000/members/auth/password/reset/confirm/${uid}/${token}/`, {
        new_password1: newPassword1,
        new_password2: newPassword2,
      });
      setMessage("Mot de passe modifié avec succès !");
    } catch (error) {
      setMessage("Erreur lors du changement.");
    }
  };

  return (
    <div>
      <h2>Définir un nouveau mot de passe</h2>
      {/* Start of form. Clicking "Réinitialiser" triggers handleSubmit.*/}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={newPassword1}
          onChange={(newPassword1) => setNewPassword1(newPassword1.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          value={newPassword2}
          onChange={(newPassword2) => setNewPassword2(newPassword2.target.value)}
          required
        />
        <button type="submit">Réinitialiser</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ResetPassword;
