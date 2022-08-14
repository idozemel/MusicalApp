import React, { useContext} from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';


const Navigation = () => {
  const cntx = useContext(AuthContext);
  return (
    <nav className={classes.nav}>
      <ul>
        {cntx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {cntx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {cntx.isLoggedIn && (
          <li>
            <button onClick={cntx.onLogOut}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
