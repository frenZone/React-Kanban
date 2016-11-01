import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {receiveTasks} from '../actions/kanbanActions';
import styles from './sass/items.scss';
import EditTask from './EditTask';
import EditButton from './EditButton';
import MoveQueueButton from './MoveQueueButton';
import MoveDoneButton from './MoveDoneButton';
import DeleteButton from './DeleteButton';

class Progress extends React.Component {
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
    if (this.props.showEditForm) {
      renderedElement = (
        <div id={this.props.id}>
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
        <div>
          <div className={styles.buttonsContainer}>
            <MoveQueueButton id={this.props.id} />
            <MoveDoneButton id={this.props.id} />
          </div>
          <div className={styles.buttonsContainer}>
            <EditButton index={this.props.index} />
            <DeleteButton id={this.props.id} />
          </div>
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
