import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function VerifyEmail() {
  // Creation of a local message state that will contain the text to be displayed to the user
  const [message, setMessage] = useState('');
  // Retrieves the URL parameters (query string), for example: ?token=abcd123
  const query = new URLSearchParams(useLocation().search);
  // Retrieves the token found in the URL
  const token = query.get('token');
  
  // Allows you to execute a function when the component is mounted or when data changes
  useEffect(() => {
    // Check if a token was found in the URL
    if (token) {
      // Sends an HTTP GET request to the Django API, adding the token in the URL as a parameter
      fetch(`http://localhost:8000/members/auth/verify-email/?token=${token}`)
        // Once Django responds, we transform the response into a JSON object
        .then(res => res.json())
        // Displays the message received from the API, or "Email verified!" if no message is provided
        .then(data => {
          setMessage(data.detail || 'Email vérifié !');
        })
        .catch(() => setMessage('Erreur lors de la vérification.'));
    } else {
      setMessage('Token manquant.');
    }
    // Run the check only once
  }, [token]);

  return (
    <div>
      <h2>Vérification de l'adresse email</h2>
      <p>{message}</p>
    </div>
  );
}

export default VerifyEmail;
