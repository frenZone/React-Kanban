import React from 'react';
import { connect } from 'react-redux';
import { receiveTasks, toggleNewForm, showErrorMessage, message} from '../actions/kanbanActions';
import KanBanList from './KanBanList';
import ReactDOM from 'react-dom';
import NewTask from './NewTask';
import styles from './sass/page.scss';

class KanBanPage extends React.Component {
  constructor() {
    super();
    this.loadData = this.loadData.bind(this);
    this.show = this.show.bind(this);
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

    oReq.open('GET', 'http://localhost:3000/api');
    oReq.send();
  }

  componentWillMount() {
    this.loadData();
  }


  show(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(toggleNewForm(true));
    dispatch(showErrorMessage(false));
    dispatch(message(null));
  }

  render(){
    let renderedElement;

    if (!this.props.showNewForm && !this.props.showErrorMessage) {
      renderedElement = (
        <div>
          <button id='toggleInput' onClick={this.show} className={styles.button}>New Task</button>
        </div>
      )
    } else if(this.props.showErrorMessage){
      renderedElement = (
        <div>
          <button id='toggleInput' onClick={this.show} className={styles.button}>New Task</button>
          <p id={styles.errorMsg}>{this.props.message}</p>
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
  return {
    data: kanbanReducer.get('List').toJS(),
    showNewForm: kanbanReducer.get('showNewForm'),
    showErrorMessage: kanbanReducer.get('showErrorMessage'),
    message : kanbanReducer.get('message')
  }
}
export default connect(
  mapStateToProps
)(KanBanPage);

