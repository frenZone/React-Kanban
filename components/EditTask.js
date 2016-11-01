import React from 'react';
import styles from './sass/items.scss';
import ReactDOM from 'react-dom';
import {receiveTasks, toggleEditForm} from '../actions/kanbanActions';
import {connect} from 'react-redux';

class EditTask extends React.Component {
  constructor() {
    super();
    this.editData = this.editData.bind(this);
    this.hideForm = this.hideForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  hideForm(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(toggleEditForm(false,this.props.index));
  }

  editData(e) {
    e.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const priority = ReactDOM.findDOMNode(this.refs.priority).value.trim();
    const createdBy = ReactDOM.findDOMNode(this.refs.createdBy).value.trim();
    const assignedTo = ReactDOM.findDOMNode(this.refs.assignedTo).value.trim();

    const oReq = new XMLHttpRequest();
    oReq.open('POST',`/edit`)
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);

    this.resetForm();
  }

  resetForm() {
    ReactDOM.findDOMNode(this.refs.title).value = ''
    ReactDOM.findDOMNode(this.refs.createdBy).value = ''
    ReactDOM.findDOMNode(this.refs.assignedTo).value = ''
  }

  render() {
    let priority;
    if (this.props.priority === 3) {
      priority = 'High';
    } else if (this.props.priority === 2) {
      priority = 'Medium';
    } else {
      priority = 'Low';
    }
    return (
      <div>
        <form className={styles.editForm}>
          <div>Title</div>
          <input type='text' ref='title' placeholder={this.props.title} name='title' className={styles.input}/>
          <div>Priority</div>
          <select ref='priority' className={styles.priority}>
            <option value='3'>High</option>
            <option value='2'>Medium</option>
            <option value='1'>Low</option>
          </select>
          <div>Created By</div>
          <input type='text' ref='createdBy' placeholder={this.props.createdBy} name='createdBy' className={styles.input}/>
          <div>Assigned To</div>
          <input type='text' ref='assignedTo' placeholder={this.props.assignedTo} name='assignedTo' className={styles.input}/>
          <button onClick={this.hideForm} className={styles.button}>x</button>
          <button onClick={this.editData} className={styles.button}>Edit</button>
        </form>
      </div>
    )
  }
}

export default connect()(EditTask);
