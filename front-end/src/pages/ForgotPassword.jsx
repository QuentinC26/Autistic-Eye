import { useState } from 'react';
// Library for making HTTP requests
import axios from 'axios';

function ForgotPassword() {
  // Creating non-fixed values
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (MissingPassword) => {
    // Prevents page reloading on form submission.
    MissingPassword.preventDefault();
    try {
      // Sends a POST request to the Django API to trigger a password reset email.
      await axios.post('http://localhost:8000/members/auth/password/reset/', {
        email: email,
      });
      setMessage("Un email de réinitialisation a été envoyé !");
    } catch (error) {
      setMessage("Erreur lors de l'envoi.");
    }
  };

  return (
    <div>
      <h2>Mot de passe oublié</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          // updates email status with every keystroke
          onChange={(email) => setEmail(email.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit">Envoyer l'email</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
