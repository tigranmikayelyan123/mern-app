import * as EmailValidator from 'email-validator';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import useInput from '../hooks/use-input';
import schema from '../utils/passwordValidator';
import classes from './SignUp.module.css';

function SignUp() {
  const navigate = useNavigate();
  const {
    value: name,
    handleInputBlur: handleNameInputBlur,
    handleInputChange: handleNameInputChange,
    enteredValueIsValid: enteredNameIsValid,
    hasError: enteredNameInputIsInvalid,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== '');

  const {
    value: email,
    handleInputBlur: handleEmailInputBlur,
    handleInputChange: handleEmailInputChange,
    enteredValueIsValid: enteredEmailIsValid,
    hasError: enteredEmailInputIsInvalid,
    reset: resetEmailInput,
  } = useInput((value) => EmailValidator.validate(value));

  const {
    value: password,
    handleInputBlur: handlePasswordInputBlur,
    handleInputChange: handlePasswordInputChange,
    enteredValueIsValid: enteredPasswordIsValid,
    hasError: enteredPasswordInputIsInvalid,
    reset: resetPasswordInput,
  } = useInput((value) => schema.validate(value));

  const { sendRequest: signup } = useHttp();

  useEffect(() => {
    const auth = localStorage.getItem('userData');
    if (auth) {
      navigate('/');
    }
  }, [navigate]);

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const handleSignUpData = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    navigate('/');
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup({
      url: process.env.REACT_APP_USER_SIGNUP_URL,
      method: 'POST',
      body: {
        name,
        email,
        password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    }, handleSignUpData);

    resetNameInput();
    resetEmailInput();
    resetPasswordInput();
  };

  const nameOfNameClasses = enteredNameInputIsInvalid
    ? 'inputBox invalid'
    : 'inputBox';

  const nameOfEmailClasses = enteredEmailInputIsInvalid
    ? 'inputBox invalid'
    : 'inputBox';

  const nameOfPasswordClasses = enteredPasswordInputIsInvalid
    ? 'inputBox invalid'
    : 'inputBox';

  return (
    <form className={classes.register} onSubmit={handleSignup}>
      <h1>Register</h1>
      <input
        type="text"
        value={name}
        onChange={handleNameInputChange}
        onBlur={handleNameInputBlur}
        className={nameOfNameClasses}
        placeholder="Enter name"
      />
      {enteredNameInputIsInvalid && (
        <p className={classes['error-text']}>Enter valid name</p>
      )}
      <input
        type="email"
        value={email}
        onChange={handleEmailInputChange}
        onBlur={handleEmailInputBlur}
        className={nameOfEmailClasses}
        placeholder="Enter email"
      />
      {enteredEmailInputIsInvalid && (
        <p className={classes['error-text']}>Enter valid email</p>
      )}
      <input
        type="password"
        value={password}
        onChange={handlePasswordInputChange}
        onBlur={handlePasswordInputBlur}
        className={nameOfPasswordClasses}
        placeholder="Enter password"
      />
      {enteredPasswordInputIsInvalid && (
        <p className={classes['error-text']}>Must have minimum 8 chars, has uppercase, lowercase and 2 digits</p>
      )}
      <button
        disabled={!formIsValid}
        className={classes.appButton}
        type="submit"
      >
        SignUp
      </button>
    </form>
  );
}

export default SignUp;
