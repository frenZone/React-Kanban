import React from 'react';
import ReactDOM from 'react-dom';

class Done extends React.Component {
  constructor() {
    super()
    this.editData = this.editData.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.toProgress = this.toProgress.bind(this);
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
      this.props.load();
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);
  }

  deleteData(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/delete')
    oReq.onload = () => {
      this.props.load();
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}`)
  }

  toProgress(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/move')
    oReq.onload = () => {
      this.props.load();
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Progress`)
  }


  render() {
    return(
      <div className="doneList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <button onClick={this.toProgress}>In Progress</button>

        <form method='post' action='/edit' id={this.props.id} >
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <input type='text' ref='title' placeholder={this.props.title} name='title'/>
          <input type='text' ref='priority' placeholder={this.props.priority} name='priority'/>
          <input type='text' ref='createdBy' placeholder={this.props.createdBy} name='createdBy'/>
          <input type='text' ref='assignedTo' placeholder={this.props.assignedTo} name='assignedTo'/>
          <button onClick={this.editData}>Edit</button>
        </form>

        <button onClick={this.deleteData}>Delete</button>
      </div>
    )
  }
}
export default Done;