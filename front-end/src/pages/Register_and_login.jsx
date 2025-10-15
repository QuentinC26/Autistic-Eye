import './App.css'
import React, { useState } from 'react';

function Register() {
  // Creating non-fixed values ​from a user
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');


  // Function that takes care of sending the registration form data to your backend (Django) and handling the response.
  const handleSubmit = async (register) => {
    // This prevents the page from reloading when you submit the form, which is important in React to handle this in JavaScript.
    register.preventDefault();

    try {
      setMessage('En cours...');
      const response = await fetch('http://localhost:8000/members/auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password1: password,
        password2: password,
        first_name,
        last_name,
        age,
        location
      })
      });
      if (response.ok) {
      setMessage('Vous êtes inscrit !');
    } else {
      const errorData = await response.json();
      setMessage(`Erreur: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    setMessage(`Erreur réseau : ${error.message}`);
  };
  }; 

  return (
    <>
        <p>
        {/* <form> is an HTML element used to create a form, i.e. a space where the user can fill in information (such as their name, age, etc.). */}
        <form onSubmit={handleSubmit}>
          {/* The <input> tag creates a field where the user can enter information. */}
          <input
          type="text"
          placeholder="first_name"
          value={first_name}
          onChange={(register) => setFirst_name(register.target.value)}
          />
          <br></br>
          <input
          type="text"
          placeholder="last_name"
          value={last_name}
          onChange={(register) => setLast_name(register.target.value)}
          />
          <br></br>
          <input
          type="number"
          placeholder="Âge"
          value={age}
          onChange={(register) => setAge(Number(register.target.value))}
          />
          <br></br>
          <input
          type="text"
          placeholder="location"
          value={location}
          onChange={(register) => setLocation(register.target.value)}
          />
          <br></br>
          <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(register) => setEmail(register.target.value)}
          />
          <br></br>
          <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(register) => setPassword(register.target.value)}
          />
          <br></br>
          <br></br>
          {/* read the message if there is one */}
          {message && <p>{message}</p>}
          {/* This button is for valid the registration */}
          <button type="submit">Register</button>
        </form>
        </p>
    </>
  )
}

export default Register;