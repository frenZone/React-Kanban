import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks, toggleNewForm, showErrorMessage, message} from '../actions/kanbanActions';
import styles from './sass/newTask.scss';

class NewTask extends React.Component {
  constructor() {
    super();

    this.newData = this.newData.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  newData(e) {
    e.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const priority = ReactDOM.findDOMNode(this.refs.priority).value.trim();
    const createdBy = ReactDOM.findDOMNode(this.refs.createdBy).value.trim();
    const assignedTo = ReactDOM.findDOMNode(this.refs.assignedTo).value.trim();

    const oReq = new XMLHttpRequest();
    oReq.open('POST',`/newTask`)
    oReq.onload = () => {
      if (!JSON.parse(oReq.response).data) {
        const {dispatch} = this.props;
        dispatch(showErrorMessage(true));
        dispatch(message(JSON.parse(oReq.response).error));
      } else {
        const {dispatch} = this.props;
        dispatch(receiveTasks(JSON.parse(oReq.response).data));
      }
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);

    this.toggle();
  }

  toggle() {
    const { dispatch } = this.props;
    dispatch(toggleNewForm(false));
  }

  render() {
    return (
      <div className={styles.form}>
        <form method='post' action='/newTask' id='newInput'>
          <input ref='title' type='text' placeholder='title' name='title' className={styles.input}/>
          <select ref='priority' className={styles.priority}>
            <option value='3'>High</option>
            <option value='2'>Medium</option>
            <option value='1'>Low</option>
          </select>
          <input ref='createdBy' type='text' placeholder='Created By' name='createdBy' className={styles.input}/>
          <input ref='assignedTo' type='text' placeholder='Assigned To' name='assignedTo' className={styles.input}/>

        </form>
        <p onClick={this.toggle} className={styles.button}>x</p>
        <p onClick={this.newData} form='newInput' className={styles.button}>Enter</p>
      </div>
    )
  }
}


export default connect()(NewTask);
