import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useHttp from '../hooks/use-http';
import classes from './SearchBar.module.css';

function SearchBar({ setSearchResults }) {
  const [inputValue, setInputValue] = useState('');
  const { sendRequest: getCities } = useHttp();

  const handleCitiesData = (inputText, citiesData) => {
    // eslint-disable-next-line max-len
    const results = citiesData.data.filter((city) => inputText && city && city.name && city.name.includes(inputText));
    setSearchResults(results);
  };

  const handleInputChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);

    getCities({
      url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
        'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host,
      },
    }, handleCitiesData.bind(null, inputText));
  };

  return (
    <div className={classes['input-wrapper']}>
      <FaSearch id={classes['search-icon']} />
      <input
        value={inputValue}
        onChange={handleInputChange}
        type="text"
        placeholder="Type to search..."
      />
    </div>
  );
}

export default SearchBar;
