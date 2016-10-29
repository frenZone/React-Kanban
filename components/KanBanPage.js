import React from 'react';
import { connect } from 'react-redux';
import { receiveTasks, toggleNewForm } from '../actions/kanbanActions';
import KanBanList from './KanBanList';
import ReactDOM from 'react-dom';
import NewTask from './NewTask';
import styles from './page.scss';

class KanBanPage extends React.Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.showNewForm = this.showNewForm.bind(this);
  }

  loadData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (data) => {
    const parsedData = JSON.parse(data.currentTarget.response).data;
    const { dispatch } = this.props;
    dispatch(receiveTasks(parsedData));

    });

    oReq.addEventListener('error', (error) => {
      console.error(error);
    });

    oReq.open('GET', this.props.url);
    oReq.send();
  }

  componentWillMount() {
    this.loadData();
  }


  showNewForm(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(toggleNewForm(true))
    // const container = document.getElementById('new-task-container');
    // const button = document.getElementById('toggleInput');
    // container.className = 'visible';
    // button.className = styles.invisible;
  }

  render(){
    let renderedElement;
    if (!this.props.showNewForm) {
      renderedElement = (
        <div>
          <button id='toggleInput' onClick={this.showNewForm} className={styles.button}>New Task</button>
        </div>
      )
    } else {
      renderedElement = (
        <NewTask />
      )
    }
    return (
      <div id={styles.page}>
        <div id={styles.header}>
          <h1>KanBan Page</h1>
        </div>
        <div id={styles.newInput}>
          { renderedElement }
        </div>
        <KanBanList data={this.props.data} />
      </div>
    );
  }
}

KanBanPage.defaultProps = {
  data: React.PropTypes.array
}

const mapStateToProps = (state, ownProps) => {

  const { kanbanReducer } = state;
  console.log('showNewForm',kanbanReducer.get('showNewForm'));
  return {
    data: kanbanReducer.get('List').toJS(),
    showNewForm: kanbanReducer.get('showNewForm')
  }
}
export default connect(
  mapStateToProps
)(KanBanPage);

