import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {login, showLoginErr} from '../../actions/kanbanActions';
import styles from '../sass/login.scss';

class Login extends React.Component {

  constructor() {
    super();

    this.login = this.login.bind(this);
    this.resetForm = this.resetForm.bind(this);
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
        console.log('here');
        const {dispatch} = this.props;
        dispatch(showLoginErr(true));
      } else {
        const {dispatch} = this.props;
        dispatch(login(JSON.parse(oReq.response).username));
        dispatch(showLoginErr(false));
        this.context.router.push('/')
      }
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`username=${username}&password=${password}`);
    this.resetForm();
  }
  resetForm() {
    ReactDOM.findDOMNode(this.refs.username).value = ''
    ReactDOM.findDOMNode(this.refs.password).value = ''
  }

  render() {
    let renderedElement;
    if(this.props.showLoginErr) {
      renderedElement = (
        <div className={styles.container}>
          <div className={styles.loginElement}>
            <p className={styles.title}>Login</p>
            <p className={styles.error}>Invalid username or password</p>
          </div>
          <div className={styles.loginForm}>
            <form className={styles.form}>
              <p className={styles.subTitle}>Username</p>
              <input ref='username' className={styles.input}/>
              <p className={styles.subTitle}>Password</p>
              <input type='password' ref='password' className={styles.input}/>
              <button className={styles.button} onClick={this.login}>Enter</button>
            </form>
          </div>
        </div>
      )
    } else {
      renderedElement = (
        <div className={styles.container}>
        <div className={styles.loginElement}>
          <h1 className={styles.title}>Login</h1>
        </div>
        <div className={styles.loginForm}>
          <form className={styles.form}>
            <h3 className={styles.subTitle}>Username</h3>
            <input ref='username' className={styles.input}/>
            <h3 className={styles.subTitle}>Password</h3>
            <input type='password' ref='password' className={styles.input}/>
            <button className={styles.button} onClick={this.login}>Enter</button>
          </form>
        </div>
      </div>
      )
    }
    return (
      <div>
        {renderedElement}
      </div>
    )
  }
}

Login.contextTypes = {
  router: React.PropTypes.object
}


const mapStateToProps = (state, ownProps) => {

  const { kanbanReducer } = state;
  return {
    user: kanbanReducer.get('login'),
    showLoginErr: kanbanReducer.get('showLoginErr')
  }
}
export default connect(
  mapStateToProps
)(Login);