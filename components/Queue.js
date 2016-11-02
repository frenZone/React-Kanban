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

    if(this.props.showEditForm && this.props.user) {
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
    } else if (this.props.user) {
      renderedElement = (
        <div className={styles.item}>
          <div className={styles.left}>
            <p id={styles.taskTitle}>{this.props.title}</p>
            <p>Priority: {priority}</p>
            <p>Assigned By: {this.props.createdBy}</p>


            <div className={styles.buttonsContainer}>
              <EditButton index={this.props.index} />
              <DeleteButton id={this.props.id} />
              <MoveProgressButton id={this.props.id} arrow={'>'} />
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.assignedTo}>
              <p>{this.props.assignedTo}</p>
            </div>
          </div>
        </div>
      )
    } else {
      renderedElement = (
        <div className={styles.item}>
          <div className={styles.left}>
            <p id={styles.taskTitle}>{this.props.title}</p>
            <p>Priority: {priority}</p>
            <p>Created By: {this.props.createdBy}</p>
          </div>
          <div className={styles.right}>
            <p>{this.props.assignedTo}</p>
          </div>
        </div>
      )
    }
    return(
      <div id={styles.queueBorder} className={styles.list} >

        { renderedElement }

      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {

  const { kanbanReducer } = state;
  return {
    user: kanbanReducer.get('login')
  }
}
export default connect(
  mapStateToProps
)(Queue);

