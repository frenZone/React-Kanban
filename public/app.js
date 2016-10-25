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
              <input type='text' name='priority'/>
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

class KanBanList extends React.Component {


  render() {
    const QueueListNode = this.props.queue.map((dataItem) => {
      return (
        <Queue
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          id={dataItem.id}
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
          id={dataItem.id}
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
          id={dataItem.id}
          key={dataItem.id}
        />
      )
    })

    return (
      <div id='listHolder'>
        <div id='Queue' className='list'>
          <h1>Queue</h1>
          {QueueListNode}
        </div>
        <div id='Progress' className='list'>
          <h1>In Progress</h1>
          {ProgressListNode}
        </div>
        <div id='Done' className='list'>
          <h1>Done</h1>
          {DoneListNode}
        </div>
      </div>
    )
  }
}

class Queue extends React.Component {

  render() {
    console.log(this.props);
    return(
      <div className="queueList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <form method='post' action='/moveToProgress'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button>in progress</button>
        </form>
      </div>
    )
  }
}

class Progress extends React.Component {

  render() {
    return(
      <div className="progressList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <form method='post' action='/moveToQueue'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button>queue</button>
        </form>
        <form method='post' action='/moveToDone'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button>done</button>
        </form>
      </div>
    )
  }
}

class Done extends React.Component {

  render() {
    return(
      <div className="doneList">
        <h4>{this.props.title}</h4>
        <p>Priority Level: {this.props.priority}</p>
        <p>Created By: {this.props.createdBy}</p>
        <p>Assigned To: {this.props.assignedTo}</p>
        <form method='post' action='/moveToProgress'>
          <input type='text' value={this.props.id} name='id' className='invisible'/>
          <button>in progress</button>
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <KanBanPage url='http://localhost:3000/api' />,
  document.getElementById('root')
);