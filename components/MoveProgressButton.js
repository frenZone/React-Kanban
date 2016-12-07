import React from 'react';
import styles from './sass/items.scss';
import {receiveTasks, toggleEditForm} from '../actions/kanbanActions';
import {connect} from 'react-redux';

class MoveProgressButton extends React.Component {
  constructor() {
    super();
    this.toProgress = this.toProgress.bind(this);
  }

  toProgress(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST',`/api/move`)
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Progress`)
  }

  render() {
    return (
      <div>
        <p onClick={this.toProgress} className={styles.button} >{this.props.arrow}</p>
      </div>
    )
  }
}


export default connect()(MoveProgressButton);
