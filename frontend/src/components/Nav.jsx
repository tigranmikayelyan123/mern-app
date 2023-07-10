import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Nav.module.css';

function Nav() {
  const auth = localStorage.getItem('userData');
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('signup');
  };

  return (
    <div>
      {auth ? (
        <ul className={classes['nav-ul']}>
          <li><Link to="/">Search cities</Link></li>
          <li><Link to="/items">Saved cities</Link></li>
          <li>
            <Link to="/signup" onClick={logout}>
              Logout
            </Link>
          </li>
        </ul>
      ) : (
        <ul className={`${classes['nav-ul']} ${classes['nav-right']}`}>
          <li><Link to="/signup">SignUp</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      )}
    </div>
  );
}

export default Nav;
