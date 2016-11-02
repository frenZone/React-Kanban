import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks} from '../actions/kanbanActions';
import styles from './sass/items.scss';
import EditTask from './EditTask';
import EditButton from './EditButton';
import MoveProgressButton from './MoveProgressButton';
import DeleteButton from './DeleteButton';

class Queue extends React.Component {
  constructor() {
    super()
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
    if(this.props.showEditForm) {
      renderedElement = (
        <div >
          <EditTask
            title={this.props.title}
            createdBy={this.props.createdBy}
            assignedTo={this.props.assignedTo}
            priority={this.props.priority}
            index={this.props.index}
            id={this.props.id}
          />
        </div>
      )
    } else {
      renderedElement = (
        <div className={styles.item}>
          <h3>{this.props.title}</h3>
          <p>Priority Level: {priority}</p>
          <p>Created By: {this.props.createdBy}</p>
          <p>Assigned To: {this.props.assignedTo}</p>

          <div className={styles.buttonsContainer}>
            <MoveProgressButton id={this.props.id} arrow={'>'} />
          </div>

          <div className={styles.buttonsContainer}>
            <EditButton index={this.props.index} />
            <DeleteButton id={this.props.id} />
          </div>
        </div>
      )
    }
    return(
      <div className={styles.list} >

        { renderedElement }

      </div>
    )
  }
}

export default connect()(Queue);

