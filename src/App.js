import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';

import Posts from './components/posts'
import Postform from './components/postform'
import Elevator from './components/elevator'
import store from './store'

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

          <Elevator/>

          {/* <p className="App-intro">
        Anatoliy
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        </div>
      // </Provider>

    );
  }
}

export default App;
