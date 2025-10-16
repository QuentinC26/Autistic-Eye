import './App.css'
import React, { useState } from 'react';
// Access the data of the context you created
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export function Register() {
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
      setMessage('In progress...');
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
      setMessage('You are registered !!');
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    setMessage(`Network Error : ${error.message}`);
  };
  }; 
  // Get the user from the context
  const { user } = useContext(AuthContext);

  return (
    <>
        {/* ? = the condition is True */}
        {/* : = the condition is False */}
        {user ? (
          // Redirects the user to the Register/Login page
          <Navigate to="/Home" />
        ) : (
        // <form> is an HTML element used to create a form, i.e. a space where the user can fill in information (such as their name, age, etc.).
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
        )}
    </>
  )
}

export function Login() {
  // Creating non-fixed values ​from a user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Provides access to a function that allows you to redirect the user with JavaScript.
  const navigate = useNavigate();

  // Function that takes care of sending the registration form data to your backend (Django) and handling the response.
  const handleSubmit = async (login) => {
    // This prevents the page from reloading when you submit the form, which is important in React to handle this in JavaScript.
    login.preventDefault();

    try {
      setMessage('In Progress...');
      const response = await fetch('http://localhost:8000/members/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password: password,
      })
      });
      if (response.ok) {
      setMessage(`You are Logined in !!`);
      navigate('/');   
    } else {
      const errorData = await response.json();
      setMessage(`Error : ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    setMessage(`Network Error : ${error.message}`);
  };
  }; 

  return (
    <>
        {/* <form> is an HTML element used to create a form, i.e. a space where the user can fill in information (such as their name, age, etc.). */}
        <form onSubmit={handleSubmit}>
          {/* The <input> tag creates a field where the user can enter information. */}
          <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(login) => setEmail(login.target.value)}
          />
          <br></br>
          <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(login) => setPassword(login.target.value)}
          />
          <br></br>
          <br></br>
          {/* read the message if there is one */}
          {message && <p>{message}</p>}
          {/* This button is for valid the registration */}
          <button type="submit">Login</button>
        </form>
    </>
  )
}

export default function Register_and_login() {
  return (
    <div>
      <Register /> 
      <br></br>
      <br></br>
      <Login />
    </div>
 );
}
