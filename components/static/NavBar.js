import React from 'react';
import styles from '../sass/navbar.scss';
import {Link} from 'react-router';


class NavBar extends React.Component {
  render() {
    return (
      <ul role='nav' className={styles.nav}>
        <li><Link to='/' className={styles.li}>Home</Link></li>
        <li><Link to='/about' className={styles.li}>About</Link></li>
      </ul>
    )
  }
}

export default NavBar;

