import React from 'react';


class Progress extends React.Component {

  render() {
    return(
      <div className="progressList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <form method='post' action='/moveToQueue'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button className='preventReload'>queue</button>
        </form>
        <form method='post' action='/moveToDone'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button className='preventReload'>done</button>
        </form>
      </div>
    )
  }
}
export default Progress;
