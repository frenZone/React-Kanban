import React from 'react';


class Progress extends React.Component {

  formHandler(e) {
    e.preventDefault();
    console.log(e);
    const oReq = new XMLHttpRequest()
    oReq.addEventListener('load', this.onKanBan);
    oReq.addEventListener('error', this.onKanBanError);

    oReq.open('GET', APIurl);
    oReq.send();
  }

  render() {
    return(
      <div className="progressList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <form method='post' action='/moveToQueue'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button className='preventReload'>Queue</button>
        </form>
        <form method='post' action='/moveToDone'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button type='submit'>Done</button>
        </form>

        <form method='post' action='/edit' id={this.props.id}>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <input type='text' placeholder={this.props.title} name='title'/>
          <input type='text' placeholder={this.props.priority} name='priority'/>
          <input type='text' placeholder={this.props.createdBy} name='createdBy'/>
          <input type='text' placeholder={this.props.assignedTo} name='assignedTo'/>
          <button className='preventReload'>Edit</button>
        </form>

        <form method='post' action='/delete'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button type='submit'>Delete</button>
        </form>
      </div>
    )
  }
}
export default Progress;
