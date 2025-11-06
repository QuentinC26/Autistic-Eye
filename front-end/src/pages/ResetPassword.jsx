import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import './App.css'; 

function ResetPassword() {
  // Retrieves uid and tolen values directly from the URL using useParams()
  const { uid, token } = useParams();
  const navigate = useNavigate();
  // To display error or success messages
  const [message, setMessage] = useState('');

  // Provides all the necessary tools to save fields, automatically validate the form, manage errors, and react to value changes.
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  // Function called upon form submission
  const MissingPasswordSubmit = async (data) => {
    try {
      setMessage('En cours de chargement...');
      // Sends a POST request to the Django REST Auth endpoint (/auth/password/reset/confirm/) with the required data
      const response = await fetch("http://localhost:8000/members/auth/password/reset/confirm/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password1: data.new_password1,
          new_password2: data.new_password2,
        }),
      });
      if (response.ok) {
        setMessage("Mot de passe modifié avec succès !");
        // Redirects to the login page after 2 seconds
        setTimeout(() => navigate('/register_and_login'), 2000);
      } else {
        const errorData = await response.json();
        // Different errors handled with different custom messages
        if (errorData.new_password2 || errorData.new_password1) {
          setMessage("Les mots de passe ne respectent pas les conditions de sécurité.");
        } else if (errorData.token) {
          setMessage("Le lien de réinitialisation est invalide ou expiré.");
        } else {
          setMessage("Une erreur est survenue. Vérifiez vos informations.");
        }
      }
    } catch (error) {
      setMessage(`Erreur réseau : ${error.message}`);
    }
  };

  // To validate the password matching
  const new_password1 = watch("new_password1");

  return (
     <form onSubmit={handleSubmit(MissingPasswordSubmit)} className="form-container">
      <h2 className="form-title">Définir un nouveau mot de passe</h2>

      <div className="form-group">
        <label className="form-label">Nouveau mot de passe :</label>
        <input
          type="password"
          className="form-input"
          {...register("new_password1", { required: true, minLength: 8 })}
          autoComplete="new-password"
        />
        {errors.new_password1?.type === "required" && (
          <span className="error-text">Champ requis</span>
        )}
        {errors.new_password1?.type === "minLength" && (
          <span className="error-text">Au moins 8 caractères</span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label">Confirmez le mot de passe :</label>
        <input
          type="password"
          className="form-input"
          {...register("new_password2", {
            required: true,
            validate: value => value === new_password1 || "Les mots de passe ne correspondent pas",
          })}
          autoComplete="new-password"
        />
        {errors.new_password2 && (
          <span className="error-text">{errors.new_password2.message || "Champ requis"}</span>
        )}
      </div>

      <button type="submit" className="form-button">Réinitialiser</button>

      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export default ResetPassword;
