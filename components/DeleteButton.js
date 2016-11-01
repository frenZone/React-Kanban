import React from 'react';
import styles from './sass/items.scss';
import {receiveTasks} from '../actions/kanbanActions';
import {connect} from 'react-redux';

class DeleteButton extends React.Component {
  constructor() {
    super()
    this.deleteData = this.deleteData.bind(this);
  }

  deleteData(e) {
    e.preventDefault();
    const oReq = new XMLHttpRequest();
    oReq.open('POST',`/delete`)
    oReq.onload = () => {
      const {dispatch} = this.props;
      dispatch(receiveTasks(JSON.parse(oReq.response).data))
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}`)
  }

  render() {
    return (
      <div>
        <button onClick={this.deleteData} className={styles.button}>Delete</button>
      </div>
    )
  }
}

export default connect()(DeleteButton);
