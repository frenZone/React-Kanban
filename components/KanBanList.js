import React from 'react';
import Queue from './Queue';
import Progress from './Progress';
import Done from './Done';
import styles from './sass/list.scss';

class KanBanList extends React.Component {

  render() {
    const QueueListNode = this.props.data.filter(item => {
      return item.status === 'Queue';
    })
    .map((dataItem) => {
      return (
        <Queue
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          id={dataItem.id}
          index={dataItem.index}
          showEditForm={dataItem.showEditForm}
          key={dataItem.id}
        />
      )
    })

    const ProgressListNode = this.props.data.filter(item => {
      return item.status === 'Progress';
    })
    .map((dataItem) => {
      return (
        <Progress
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          id={dataItem.id}
          index={dataItem.index}
          showEditForm={dataItem.showEditForm}
          key={dataItem.id}
        />
      )
    })

    const DoneListNode = this.props.data.filter(item => {
      return item.status === 'Done';
    })
    .map((dataItem) => {
      return (
        <Done
          title={dataItem.title}
          priority={dataItem.priority}
          createdBy={dataItem.createdBy}
          assignedTo={dataItem.assignedTo}
          id={dataItem.id}
          index={dataItem.index}
          showEditForm={dataItem.showEditForm}
          key={dataItem.id}
        />
      )
    })

    return (
      <div id={styles.listHolder}>
        <div id='Queue' className={styles.list}>
          <h1 className={styles.title}>IN QUEUE</h1>
          {QueueListNode}
        </div>
        <div id='Progress' className={styles.list}>
          <h1 className={styles.title}>IN PROGRESS</h1>
          {ProgressListNode}
        </div>
        <div id='Done' className={styles.list}>
          <h1 className={styles.title}>DONE</h1>
          {DoneListNode}
        </div>
      </div>
    )
  }
}

export default KanBanList;