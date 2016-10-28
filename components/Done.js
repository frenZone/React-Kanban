import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks} from '../actions/kanbanActions';
import styles from './items.scss';

class Done extends React.Component {
  constructor() {
    super()
    this.editData = this.editData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.toProgress = this.toProgress.bind(this);
    this.visible = this.visible.bind(this);
  }

  editData(e) {
    e.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const priority = ReactDOM.findDOMNode(this.refs.priority).value.trim();
    const createdBy = ReactDOM.findDOMNode(this.refs.createdBy).value.trim();
    const assignedTo = ReactDOM.findDOMNode(this.refs.assignedTo).value.trim();

    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/edit')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);

    const formDiv = document.getElementById(`${this.props.id}`)
    formDiv.className = styles.invisible;

    const toggle = document.getElementById(`toggle${this.props.id}`);
    toggle.className = 'visible';
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

  toProgress(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/move')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Progress`)
  }

  visible() {
    const formDiv = document.getElementById(`${this.props.id}`)
    formDiv.className = styles.visible;
    const toggle = document.getElementById(`toggle${this.props.id}`);
    toggle.className = styles.invisible;
  }


  render() {
    return(
      <div className={styles.list}>
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <button onClick={this.toProgress}>In Progress</button>

        <div className={styles.invisible} id={this.props.id}>
          <form>
            <input type='text' ref='title' placeholder={this.props.title} name='title'/>
            <select ref='priority' className={styles.priority}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input type='text' ref='createdBy' placeholder={this.props.createdBy} name='createdBy'/>
            <input type='text' ref='assignedTo' placeholder={this.props.assignedTo} name='assignedTo'/>
            <button onClick={this.editData}>Edit</button>
          </form>
        </div>
        <button onClick={this.visible} id={'toggle' + this.props.id}>Edit</button>

        <button onClick={this.deleteData}>Delete</button>
      </div>
    )
  }
}
export default connect()(Done);