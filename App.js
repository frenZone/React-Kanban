import React from 'react';
import NavBar from './components/static/NavBar';
import styles from './components/sass/app.scss';
class App extends React.Component {
  render() {
    return (
      <div id={styles.mainContainer}>
        <div id={styles.header}>
          <div>
            <p>KANBAN</p>
          </div>
          <NavBar />
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;


