import './App.css'
import React, { useState } from 'react';

function Register() {
  {/* Creating non-fixed values ​​from a user */}
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  return (
    <>
        <p>
        REGISTER AND LOGIN
        </p>
    </>
  )
}

export default Register
