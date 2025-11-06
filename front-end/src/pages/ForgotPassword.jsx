import { useState } from 'react';
import { useForm } from 'react-hook-form';

function ForgotPassword() {
  const { register, handleSubmit, reset } = useForm();
  const [message, setMessage] = useState('');

  const MissingPasswordSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:8000/members/auth/password/reset/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      if (response.ok) {
        setMessage("Un email de réinitialisation a été envoyé !");
        // Resets the form after submission
        reset();
      } else {
        const errorData = await response.json();
        setMessage(errorData.detail || "Erreur lors de l'envoi.");
      }
    } catch (error) {
      setMessage("Erreur lors de l'envoi.");
      console.error(error);
    }
  };

  return (
    <div><h2 className="form-title">Mot de passe oublié</h2>
    <div className="form-container">
      <br />
      <br />
      <form onSubmit={handleSubmit(MissingPasswordSubmit)}>
        <div className="form-group">
        <label htmlFor="email" className="form-label">Email :</label>
        <br />
        <input className="form-input"
          type="email"
          placeholder="Votre email"
          {...register('email', { required: true }) }
        />
        </div>
        <br />
        <br />
        <button type="submit" className="form-button">Envoyer l'email</button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
    </div>
  );
}

export default ForgotPassword;
