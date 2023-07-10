import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import classes from './Login.module.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, sendRequest: login } = useHttp();
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('userData');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginData = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    navigate('/');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await login({
      url: process.env.REACT_APP_USER_SIGNIN_URL,
      method: 'POST',
      body: {
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }, handleLoginData);
  };

  return (
    <div className={classes.login}>
      <h1>Login</h1>
      <input
        className={classes.inputBox}
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        className={classes.inputBox}
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button
        type="button"
        className={classes.appButton}
        onClick={handleLogin}
      >
        Login
      </button>
      {error && <p className={classes['error-text']}>Wrong email or password</p>}
    </div>
  );
}

export default Login;
