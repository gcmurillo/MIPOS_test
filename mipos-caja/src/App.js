import React, { Component } from 'react';
import './App.css';
import Aperture from './components/aperture'

class App extends Component {

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <Aperture value_previous_close={22}></Aperture>
        </header>
      </div>
    );
  }

}

export default App;
