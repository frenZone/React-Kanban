import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks, toggleNewForm} from '../actions/kanbanActions';
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
    oReq.open('POST','http://localhost:3000/newTask')
    oReq.onload = () => {
      if (!JSON.parse(oReq.response).data) {
        //provide a message when they don't complete all fields
        console.log(JSON.parse(oReq.response).data)
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
      <div id='new-task-container'>
        <button id='close-new-task' onClick={this.toggle} className={styles.button}>x</button>
        <form method='post' action='/newTask' id='newInput'>
          <input ref='title' type='text' placeholder='title' name='title' className={styles.button}/>
          <select ref='priority' className={styles.priority}>
            <option value='3'>High</option>
            <option value='2'>Medium</option>
            <option value='1'>Low</option>
          </select>
          <input ref='createdBy' type='text' placeholder='Created By' name='createdBy' className={styles.button}/>
          <input ref='assignedTo' type='text' placeholder='Assigned To' name='assignedTo' className={styles.button}/>
          <button onClick={this.newData} className={styles.button}>Enter</button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTask);