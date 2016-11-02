import React from 'react';
import styles from '../sass/navbar.scss';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {login} from '../../actions/kanbanActions';


class NavBar extends React.Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault;

    const {dispatch} = this.props;
    dispatch(login(null));
  }

  render() {
    let renderedElement;
    if(this.props.user) {
      renderedElement = (
        <ul role='nav' className={styles.nav}>
          <li><Link to='/' className={styles.li}>HOME</Link></li>
          <li><Link to='/about' className={styles.li}>ABOUT</Link></li>
          <li><Link to='/' className={styles.li} onClick={this.logout}>LOGOUT</Link></li>
        </ul>
      )
    } else {
      renderedElement = (

        <ul role='nav' className={styles.nav}>
          <li><Link to='/' className={styles.li}>HOME</Link></li>
          <li><Link to='/about' className={styles.li}>ABOUT</Link></li>
          <li><Link to='/login' className={styles.li}>LOGIN</Link></li>
        </ul>
      )
    }
    return (
      <div>
        {renderedElement}
      </div>
    )
  }
}


const mapStateToProps = (state, ownProps) => {

  const { kanbanReducer } = state;
  return {
    user: kanbanReducer.get('login')
  }
}
export default connect(
  mapStateToProps
)(NavBar);

