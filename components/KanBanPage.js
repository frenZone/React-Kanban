import React from 'react';
import KanBanList from './KanBanList';

class KanBanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
    this.onKanBan = this.onKanBan.bind(this)
  }

  onKanBan(data) {
    const parsedData = JSON.parse(data.currentTarget.response).data
    console.log('parsedData',parsedData)
    this.setState({data: parsedData})
  }

  onKanBanError(error) {
    console.error(error);
  }

  loadData(APIurl) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onKanBan);
    oReq.addEventListener('error', this.onKanBanError);

    oReq.open('GET', APIurl);
    oReq.send();
  }

  componentWillMount() {
    this.loadData(this.props.url);
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
        <KanBanList data={this.state.data} />
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