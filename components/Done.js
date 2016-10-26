import React from 'react';

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
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);
  }

  deleteData(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/delete')
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}`)
  }

  toProgress(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/moveToProgress')
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}`)
  }


  render() {
    return(
      <div className="doneList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <form method='post' action='/moveToProgress'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button onClick={this.toProgress}>In Progress</button>
        </form>
        <script>

        </script>

        <form method='post' action='/edit' id={this.props.id} >
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <input type='text' ref='title' placeholder={this.props.title} name='title'/>
          <input type='text' ref='priority' placeholder={this.props.priority} name='priority'/>
          <input type='text' ref='createdBy' placeholder={this.props.createdBy} name='createdBy'/>
          <input type='text' ref='assignedTo' placeholder={this.props.assignedTo} name='assignedTo'/>
          <button onClick={this.editData}>Edit</button>
        </form>

        <form method='post' action='/delete'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button onClick={this.deleteData}>Delete</button>
        </form>
      </div>
    )
  }
}
export default Done;