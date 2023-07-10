import { useState } from 'react';

const useInput = (validate) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validate(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const handleInputChange = (event) => {
    setEnteredValue(event.target.value);
  };

  const handleInputBlur = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    enteredValueIsValid,
    hasError,
    isValueTouched: isTouched,
    handleInputChange,
    handleInputBlur,
    reset,
  };
};

export default useInput;
