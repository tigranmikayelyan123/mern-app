import React from 'react';
import { useDispatch } from 'react-redux';
import useHttp from '../hooks/use-http';
import { addCity } from '../store/citiesSlice';
import classes from './SearchResult.module.css';

function SearchResult({ result }) {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();
  const { name } = result;

  const handleCityAdd = () => { };

  const handleClick = async (e) => {
    e.stopPropagation();
    const auth = localStorage.getItem('userData');
    const { token } = JSON.parse(auth);

    const handleGetCitiesData = (data) => {
      dispatch(addCity(data));
    };

    await sendRequest({
      url: process.env.REACT_APP_ADD_CITY_URL,
      method: 'POST',
      body: {
        name,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }, handleCityAdd);

    await sendRequest({
      url: process.env.REACT_APP_GET_CITIES_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }, handleGetCitiesData);
  };

  return (
    <div className={classes['search-result']}>
      {name}
      <button type="button" className={classes.saveButton} onClick={handleClick}>Save item</button>
    </div>
  );
}

export default SearchResult;
