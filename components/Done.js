import React from 'react';

class Done extends React.Component {
  toggle() {
    document.getElementById('editForm').className = 'visible'
    document.getElementById('editButton').className = 'invisible'
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
          <button className='preventReload'>in progress</button>
        </form>
        <script>

        </script>

        <form method='post' action='/editD' id='editForm' className='invisible'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <input type='text' placeholder={this.props.title} name='title'/>
          <input type='text' placeholder={this.props.priority} name='priority'/>
          <input type='text' placeholder={this.props.createdBy} name='createdBy'/>
          <input type='text' placeholder={this.props.assignedTo} name='assignedTo'/>
          <button className='preventReload'>Edit</button>
        </form>
        <button id='editButton' className='preventReload' onClick={this.toggle}>Edit</button>
      </div>
    )
  }
}
export default Done;