import React from 'react';
import classes from './CityItem.module.css';

export function CityItem({ children }) {
  return <li className={classes.city}>{children}</li>;
}

export default CityItem;
