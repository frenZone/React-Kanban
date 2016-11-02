import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks, toggleNewForm, showErrorMessage, message} from '../../actions/kanbanActions';
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
      if (!JSON.parse(oReq.response).data) {
        // const {dispatch} = this.props;
        // dispatch(showErrorMessage(true));
        // dispatch(message(JSON.parse(oReq.response).error));
      } else {
        const {dispatch} = this.props;
        dispatch(receiveTasks(JSON.parse(oReq.response).data));
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