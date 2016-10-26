import React from 'react';
import KanBanList from './KanBanList';
import ReactDOM from 'react-dom';

class KanBanPage extends React.Component {
  constructor() {
    super();

    this.state = {
      data: []
    }
    this.loadData = this.loadData.bind(this);
    this.newData = this.newData.bind(this);
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

   newData(e) {
    e.preventDefault();
    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const priority = ReactDOM.findDOMNode(this.refs.priority).value.trim();
    const createdBy = ReactDOM.findDOMNode(this.refs.createdBy).value.trim();
    const assignedTo = ReactDOM.findDOMNode(this.refs.assignedTo).value.trim();

    const oReq = new XMLHttpRequest();
    oReq.open('POST','http://localhost:3000/newTask')
    oReq.onload = () => {
      this.loadData();
    }
    oReq.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    oReq.send(`id=${this.props.id}&title=${title}&priority=${priority}&createdBy=${createdBy}&assignedTo=${assignedTo}`);
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
              <input ref='title' type='text' placeholder='title' name='title'/>
              <select ref='priority' name='priority'>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
              </select>
              <input ref='createdBy' type='text' placeholder='Created By' name='createdBy'/>
              <input ref='assignedTo' type='text' placeholder='Assigned To' name='assignedTo'/>
              <button onClick={this.newData} >Enter</button>
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