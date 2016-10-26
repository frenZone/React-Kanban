class Done extends React.Component {

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
      </div>
    )
  }
export default Done;