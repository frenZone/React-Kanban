import React from 'react';
import styles from './sass/items.scss';
import {toggleEditForm} from '../actions/kanbanActions';
import {connect} from 'react-redux';

class EditButton extends React.Component {
  constructor() {
    super();
    this.showForm = this.showForm.bind(this);
  }

  showForm() {
    const { dispatch } = this.props;
    dispatch(toggleEditForm(true,this.props.index));
  }

  render() {
    return (
      <div>
        <p onClick={this.showForm} className={styles.button}>Edit</p>
      </div>
    )
  }
}

export default connect()(EditButton);

