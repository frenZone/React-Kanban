import React from 'react';
import NavBar from './components/static/NavBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App;


