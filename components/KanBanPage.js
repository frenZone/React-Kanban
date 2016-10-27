import React from 'react';
import KanBanList from './KanBanList';
import ReactDOM from 'react-dom';
import NewTask from './NewTask';

class KanBanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
    this.loadData = this.loadData.bind(this);
    this.showNewForm = this.showNewForm.bind(this);
  }

  loadData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', (data) => {
      const parsedData = JSON.parse(data.currentTarget.response).data
      this.setState({data: parsedData})
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
    const container = document.getElementById('new-task-container');
    const button = document.getElementById('toggleInput');
    console.log('class',container.className);
    if (container.className === 'visible') {
      container.className = 'invisible';
    } else {
      container.className = 'visible';
      button.className = 'invisible'
    }
  }

  render() {
    return (
      <div>
        <div id='header'>
          <h1>KanBan Page</h1>
        </div>
        <div id='newInput'>
          <div>
            <button id='toggleInput' onClick={this.showNewForm}>New Task</button>
          </div>
          <NewTask load={this.loadData}/>
        </div>
        <KanBanList data={this.state.data} load={this.loadData} />
      </div>
    );
  }
}

KanBanPage.defaultProps = {
  data: React.PropTypes.array
}

KanBanPage.defaultProps = {
  data: []
}

export default KanBanPage;