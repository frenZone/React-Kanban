import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/kanbanActions';
import styles from '../sass/login.scss';

class Login extends React.Component {

  constructor() {
    super();

    this.login = this.login.bind(this);
  }

  login(e) {
    e.preventDefault();
    const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
    const password = ReactDOM.findDOMNode(this.refs.password).value.trim();

    const oReq = new XMLHttpRequest();
    oReq.open('POST',`/login`)
    oReq.onload = () => {
      if (!JSON.parse(oReq.response).success) {
        // const {dispatch} = this.props;
        // dispatch(showErrorMessage(true));
        // dispatch(message(JSON.parse(oReq.response).error));

        console.log('success',JSON.parse(oReq.response).success)
      } else {
        console.log('username',JSON.parse(oReq.response).username)
        const {dispatch} = this.props;
        dispatch(login(JSON.parse(oReq.response).username));
      }
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`username=${username}&password=${password}`);

  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loginElement}>
          <h1 className={styles.title}>Login</h1>
        </div>
        <div className={styles.loginElement}>
          <form className={styles.form}>
            <h3 className={styles.subTitle}>Username</h3>
            <input ref='username' className={styles.input}/>
            <h3 className={styles.subTitle}>Password</h3>
            <input ref='password' className={styles.input}/>
            <button className={styles.button} onClick={this.login}>Enter</button>
          </form>
        </div>
      </div>
    )
  }
}

export default connect()(Login);