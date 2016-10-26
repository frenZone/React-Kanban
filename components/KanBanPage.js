import React from 'react';
import KanBanList from './KanBanList';

class KanBanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      progress: [],
      queue: [],
      done: []
    }
    this.onKanBan = this.onKanBan.bind(this)
  }

  onKanBan(data) {
    const parsedData = JSON.parse(data.currentTarget.response).data
    if(parsedData[0].status === 'Progress') {
      this.setState({progress: parsedData});
    } else if (parsedData[0].status === 'Queue') {
      this.setState({queue: parsedData});
    } else {
      this.setState({done: parsedData});
    }
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
    this.loadData(this.props.url + 'P');
    this.loadData(this.props.url + 'Q');
    this.loadData(this.props.url + 'D');
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
              <input type='text' name='title'/>
              <select name='priority'>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              </select>
              <input type='text' name='createdBy'/>
              <input type='text' name='assignedTo'/>
              <button>Enter</button>
            </form>
          </div>
        </div>
        <KanBanList queue={this.state.queue} progress={this.state.progress} done={this.state.done} />
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