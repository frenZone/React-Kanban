import React from 'react';
import styles from './sass/items.scss';
import {receiveTasks, toggleEditForm} from '../actions/kanbanActions';
import {connect} from 'react-redux';

class MoveDoneButton extends React.Component {
  constructor() {
    super();
    this.toDone = this.toDone.bind(this);
  }

  toDone(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/move')
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&status=Done`)
  }

  render() {
    return (
      <div>
        <button onClick={this.toDone} className={styles.button} >{'>'}</button>
      </div>
    )
  }
}

export default connect()(MoveDoneButton);

