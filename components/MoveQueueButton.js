import React from 'react';
import styles from './sass/items.scss';
import {receiveTasks, toggleEditForm} from '../actions/kanbanActions';
import {connect} from 'react-redux';

class MoveQueueButton extends React.Component {
  constructor() {
    super();
    this.toQueue = this.toQueue.bind(this);
  }

  toQueue(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','/move')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Queue`)
  }

  render() {
    return (
      <div>
        <button onClick={this.toQueue} className={styles.button} >{'<'}</button>
      </div>
    )
  }
}

export default connect()(MoveQueueButton);

