import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks,toggleEditForm} from '../actions/kanbanActions';
import styles from './items.scss';


class Progress extends React.Component {
  constructor() {
    super()
    this.editData = this.editData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.toQueue = this.toQueue.bind(this);
    this.toDone = this.toDone.bind(this);
    this.showForm = this.showForm.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.hideForm = this.hideForm.bind(this);
  }

  editData(e) {
    e.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const priority = ReactDOM.findDOMNode(this.refs.priority).value.trim();
    const createdBy = ReactDOM.findDOMNode(this.refs.createdBy).value.trim();
    const assignedTo = ReactDOM.findDOMNode(this.refs.assignedTo).value.trim();

    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/edit');
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);

    this.resetForm();
  }

  deleteData(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/delete')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}`)
  }

  toQueue(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/move')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Queue`)
  }

  toDone(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/move')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Done`)
  }

  showForm() {
    const { dispatch } = this.props;
    dispatch(toggleEditForm(true,this.props.index));
  }

  hideForm(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(toggleEditForm(false,this.props.index));
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
    let renderedElement;
    if (this.props.showEditForm) {
      renderedElement = (
        <div id={this.props.id}>
          <form className={styles.editForm}>
            <input type='text' ref='title' placeholder={this.props.title} name='title' className={styles.button}/>
            <select ref='priority' className={styles.priority}>
              <option value='3'>High</option>
              <option value='2'>Medium</option>
              <option value='1'>Low</option>
            </select>
            <input type='text' ref='createdBy' placeholder={this.props.createdBy} name='createdBy' className={styles.button}/>
            <input type='text' ref='assignedTo' placeholder={this.props.assignedTo} name='assignedTo' className={styles.button}/>
            <button onClick={this.hideForm} className={styles.button}>x</button>
            <button onClick={this.editData} className={styles.button}>Edit</button>
          </form>
        </div>
      )
    } else {
      renderedElement = (
        <div>
          <div className={styles.moveButtons}>
            <button onClick={this.toQueue} className={styles.button}>{'<'}</button>
            <button onClick={this.toDone} className={styles.button}>{'>'}</button>
          </div>
          <button onClick={this.showForm} className={styles.button}>Edit</button>
          <button type='submit' onClick={this.deleteData} className={styles.button}>Delete</button>
        </div>
      )
    }
    return(
      <div className={styles.list}>
        <h4>{this.props.title}</h4>
        <p>Priority Level: {priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>

        {renderedElement}

      </div>
    )
  }
}
export default connect()(Progress);
