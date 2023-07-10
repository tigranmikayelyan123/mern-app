import React from 'react';
// eslint-disable-next-line import/no-named-as-default
import CityItem from './CityItem';
import classes from './Cities.module.css';

function Cities({ cities }) {
  let citiesList = <h2>No cities found. Start adding some!</h2>;

  citiesList = (
    <ul>
      {cities.map((city) => (
        <CityItem key={Math.random()}>{city}</CityItem>
      ))}
    </ul>
  );

  return (
    <div className={classes.counter}>{citiesList}</div>
  );
}

export default Cities;
