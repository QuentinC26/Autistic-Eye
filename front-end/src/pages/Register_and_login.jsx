import './App.css'
import React, { useState } from 'react';
// Access the data of the context you created
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
// Manages fields, validation and errors
import { useForm } from "react-hook-form";

export function Register() {
  // Creates a "message" state variable to display informational or error messages.
  const [message, setMessage] = useState('');
  // Get the user from the context
  const { user } = useContext(AuthContext);
  // Initializes the react-hook-form tools :
  // register: links each form field to react-hook-form
  // handleSubmit: manages form submission in a controlled manner
  // errors: contains validation errors for each field
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Function that runs when the user clicks on “Register”
  const RegisterSubmit = async (data) => {
    try {
      setMessage('En cours de chargement...');
      const response = await fetch('http://localhost:8000/members/auth/registration/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
          password1: data.password,
          password2: data.password,
          first_name: data.first_name,
          last_name: data.last_name,
          age: data.age,
          location: data.location
      })
      });
      if (response.ok) {
        setMessage('Vous êtes inscrit !!');
    } else {
      const errorData = await response.json();
      // Different errors handled with different custom messages
      if (errorData.password1) {
          setMessage("Le mot de passe ne respecte pas les critères de sécurité (au moins 8 caractères, pas trop courant).");
        } else if (errorData.email) {
          setMessage("Cette adresse e-mail est déjà utilisée.");
        } else {
          setMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
        }
    }
  } catch (error) {
    setMessage(`Network Error : ${error.message}`);
  };
  };

  if (user) {
    return <Navigate to="/Home" />;
  }    

  return (
      <form onSubmit={handleSubmit(RegisterSubmit)} className="form-container">
      <div className="form-group">
      <label className="form-label">*Prénom :</label>
      <input {...register("first_name", { required: true })} className="form-input"/>
      {errors.first_name && <span className="error-text">Champ requis</span>}
      </div>
      <div className="form-group">
      <label className="form-label">*Nom :</label>
      <input {...register("last_name", { required: true })} className="form-input" />
      {errors.last_name && <span className="error-text">Champ requis</span>}
      </div>
      <div className="form-group">
      <label className="form-label">*Âge :</label>
      <input type="number" {...register("age", { required: true })} className="form-input" />
      {errors.age && <span className="error-text">Champ requis</span>}
      </div>
      <div className="form-group">
      <label className="form-label">*Ville :</label>
      <input {...register("location", { required: true })} className="form-input" />
      {errors.location && <span className="error-text">Champ requis</span>}
      </div>
      <div className="form-group">
      <label className="form-label">*Email :</label>
      <input type="email" {...register("email", { required: true })} className="form-input" />
      {errors.email && <span className="error-text">Champ requis</span>}
      </div>
      <div className="form-group">
      <label className="form-label">*Mot de passe :</label>
      <input type="password" {...register("password", { required: true })} className="form-input" />
      {errors.password && <span className="error-text">Champ requis</span>}
      </div>
      <br></br>
      <button type="submit" className="form-button">Inscription</button>
      {message && <p className="form-message">{message}</p>}
    </form>
  );
}

export function Login() {
  // Creates a "message" state variable to display informational or error messages.
  const [message, setMessage] = useState('');
  // To use loginUser in code
  const { loginUser } = useContext(AuthContext);
  // Initializes the react-hook-form tools :
  // register: links each form field to react-hook-form
  // handleSubmit: manages form submission in a controlled manner
  // errors: contains validation errors for each field
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Provides access to a function that allows you to redirect the user with JavaScript.
  const navigate = useNavigate();

  // Function that takes care of sending the registration form data to your backend (Django) and handling the response.
  const LoginSubmit = async (data) => {
    try {
      setMessage('En cours de chargement...');
      const response = await fetch('http://localhost:8000/members/auth/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
      });

      if (response.ok) {
        // Retrieves the JSON response (it contains the token)
        const sucessdata = await response.json();

        // Extract the token
        const accessToken = sucessdata.key;
        // Manually create a "user" with just the email
        const userInfo = { email: data.email };   

        // Connects the user: remembers their token + email (for now)
        loginUser(userInfo, accessToken);
        setMessage(`Vous êtes connecté`);
        navigate('/');   
      } else {
        const errorData = await response.json();
        // Different errors handled with different custom messages
        if (errorData.non_field_errors) {
          setMessage("Identifiants incorrects. Vérifiez votre email et votre mot de passe.");
        } else {
          setMessage("Une erreur est survenue lors de la connexion. Veuillez réessayer.");
        }
      }
  } catch (error) {
    setMessage(`Network Error : ${error.message}`);
  };
  }; 

   const handleMissingPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <>
      {/* <form> is an HTML element used to create a form, i.e. a space where the user can fill in information (such as their name, age, etc.). */}
      <form onSubmit={handleSubmit(LoginSubmit)} className="form-container">
        <div className="form-group">
        <label className="form-label">Email :</label>
        <br></br>
        <input type="email" {...register("email", { required: true })} className="form-input" />
        {errors.email && <span className="error-text">Champ requis</span>}
        </div>
        <br></br>
        <div className="form-group">
        <label className="form-label">Mot de passe :</label>
        <br></br>
        <input type="password" {...register("password", { required: true })} className="form-input" />
        {errors.password && <span className="error-text">Champ requis</span>}
        <br></br>
        </div>
        <p className="forgotpasswordbutton">
        <button onClick={handleMissingPassword}>Mot de passe oublié ? </button>
        </p>
        <br></br>
        {/* read the message if there is one */}
        {message && <p className="form-message">{message}</p>}
        {/* This button is for valid the registration */}
        <button type="submit" className="form-button">Connexion</button>
      </form>
      <br></br>
      <br></br>
    </>
  )
}

export default function Register_and_login() { 
  // Remember which form to display
  const [showLogin, setShowLogin] = useState(true);

  // Retrieve logged in user
  const { user } = useContext(AuthContext);

  // If the user is logged in
  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="page-container">
        <h3>Attention !!</h3> 
        <p className="sizetext">
        Les e-mails de validation de compte ou de réinitialisation du mot de passe peuvent se retrouver dans vos spams. Pensez à vérifier votre dossier courrier indésirable !
        </p>
        <br></br>
       <div className="switch-buttons">
      {/* Buttons to switch between Login and Register */}
        <button onClick={() => setShowLogin(false)}>Je n'ai pas de compte</button>
        <button onClick={() => setShowLogin(true)}>J'ai déjà un compte</button>
      </div>
      <br />
      {/* It displays either the Login or the Register */}
      {showLogin ? <Login /> : <Register />}
      <br></br>
      <br></br>
    </div>
 );
}
