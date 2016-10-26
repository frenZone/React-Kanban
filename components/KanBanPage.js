import React from 'react';
import KanBanList from './KanBanList';

class KanBanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
    this.loadData = this.loadData.bind(this);
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

  render() {
    return (
      <div>
        <div id='header'>
          <h1>KanBan Page</h1>
        </div>
        <div id='newInput'>
          <div>
            <button id='toggleInput'>toggle</button>
          </div>
          <div>
            <form method='post' action='/newTask' id='newInput'>
              <input type='text' placeholder='title' name='title'/>
              <select name='priority'>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              </select>
              <input type='text' placeholder='Created By' name='createdBy'/>
              <input type='text' placeholder='Assigned To' name='assignedTo'/>
              <button>Enter</button>
            </form>
          </div>
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