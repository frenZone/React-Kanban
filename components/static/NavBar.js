import React from 'react';
import styles from '../sass/navbar.scss';
import {Link} from 'react-router';


class NavBar extends React.Component {
  render() {
    return (
      <ul role='nav'>
        <li><Link to='/about'>About</Link></li>
        <li><Link to='/'>Home</Link></li>
      </ul>
    )
  }
}

export default NavBar;

