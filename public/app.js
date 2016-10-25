'use strict';

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
    console.log(parsedData)
    this.setState({data: parsedData});
  }

  onKanBanError(error) {
    console.error(error);
  }

  loadData() {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', this.onKanBan);
    oReq.addEventListener('error', this.onKanBanError);

    oReq.open('GET', this.props.url);
    oReq.send();
  }

  componentWillMount() {
    this.loadData();
  }

  render() {
    return (
      <div>
        <h1>KanBan Page</h1>
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

class KanBanList extends React.Component {


  render() {
    const kanBanListNode = this.props.data.map((dataItem) => {
      if (dataItem.status === 'Queue') {
        return (
          <Queue
            title={dataItem.title}
            createdBy={dataItem.createdBy}
            key={dataItem.id}
          />
        )
      } else if (dataItem.status === 'Progress') {
        return (
          <Progress
          title={dataItem.title}
          createdBy={dataItem.createdBy}
          key={dataItem.id}
        />
        )
      } else {
        return (
          <Done
          title={dataItem.title}
          createdBy={dataItem.createdBy}
          key={dataItem.id}
        />
        )
      }
    })
    return (
      <div>
        <h2>KanBan List</h2>
        {kanBanListNode}
      </div>
    )
  }
}

class Queue extends React.Component {

  render() {
    return(
      <div className="queueList">
        <h1>Queue</h1>
        <h4>{this.props.title}</h4>
        <p>{this.props.createdBy}</p>
      </div>
    )
  }
}

class Progress extends React.Component {

  render() {
    return(
      <div className="progressList">
        <h1>Progress</h1>
        <h4>{this.props.title}</h4>
        <p>{this.props.createdBy}</p>
      </div>
    )
  }
}

class Done extends React.Component {

  render() {
    return(
      <div className="doneList">
        <h1>Done</h1>
        <h4>{this.props.title}</h4>
        <p>{this.props.createdBy}</p>
      </div>
    )
  }
}

ReactDOM.render(
  <KanBanPage url='http://localhost:3000/api' />,
  document.getElementById('container')
);