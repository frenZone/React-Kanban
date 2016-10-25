'use strict';

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
    console.log(parsedData)
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
        <h1>KanBan Page</h1>
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

class KanBanList extends React.Component {


  render() {
    const QueueListNode = this.props.queue.map((dataItem) => {
      return (
        <Queue
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          key={dataItem.id}
        />
      )
    })

    const ProgressListNode = this.props.progress.map((dataItem) => {
      return (
        <Progress
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          key={dataItem.id}
        />
      )
    })

    const DoneListNode = this.props.done.map((dataItem) => {
      return (
        <Done
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          key={dataItem.id}
        />
      )
    })

    return (
      <div>
        <h2>KanBan List</h2>
        <div id='Queue'>
        {QueueListNode}
        </div>
        <div id='Progress'>
        {ProgressListNode}
        </div>
        <div id='Done'>
        {DoneListNode}
        </div>
      </div>
    )
  }
}

class Queue extends React.Component {

  render() {
    return(
      <div className="queueList">
        <h2>Queue</h2>
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
      </div>
    )
  }
}

class Progress extends React.Component {

  render() {
    return(
      <div className="progressList">
        <h2>In Progress</h2>
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
      </div>
    )
  }
}

class Done extends React.Component {

  render() {
    return(
      <div className="doneList">
        <h2>Done</h2>
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <KanBanPage url='http://localhost:3000/api' />,
  document.getElementById('root')
);