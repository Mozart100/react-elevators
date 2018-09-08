import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import { Provider } from 'react-redux';

import Building from './components/building' 

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>

         <Building amountOfFloors={10}  amountOfElevators={1} />

          {/* <Postform />
          <Posts /> */}
          {/* <Elevator/> */}

          {/* <p className="App-intro">
        Anatoliy
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        </div>
      // </Provider>

    );
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item,
});

export default App;
