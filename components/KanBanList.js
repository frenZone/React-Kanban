import React from 'react';
import Queue from './Queue';
import Progress from './Progress';
import Done from './Done';


class KanBanList extends React.Component {

  render() {
    const QueueListNode = this.props.data.map((dataItem) => {
      if (dataItem.status === 'Queue') {
        return (
          <Queue
            title={dataItem.title}
            priority={dataItem.priority}
            createdBy={dataItem.createdBy}
            assignedTo={dataItem.assignedTo}
            id={dataItem.id}
            load={this.props.load}
            key={dataItem.id}
          />
        )
      }
    })

    const ProgressListNode = this.props.data.map((dataItem) => {
      if (dataItem.status === 'Progress') {
        return (
          <Progress
            title={dataItem.title}
            priority={dataItem.priority}
            createdBy={dataItem.createdBy}
            assignedTo={dataItem.assignedTo}
            id={dataItem.id}
            load={this.props.load}
            key={dataItem.id}
          />
        )
      }
    })

    const DoneListNode = this.props.data.map((dataItem) => {
      if (dataItem.status === 'Done') {
        return (
          <Done
            title={dataItem.title}
            priority={dataItem.priority}
            createdBy={dataItem.createdBy}
            assignedTo={dataItem.assignedTo}
            id={dataItem.id}
            load={this.props.load}
            key={dataItem.id}
          />
        )
      }
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

export default KanBanList;