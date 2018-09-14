import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Building from './components/building'

class App extends Component {
  render() {
    return (
      // <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Elevator HW</h1>
        </header>

        <Building amountOfFloors={10} amountOfElevators={4} />

      </div>

    );
  }
}

// const mapStateToProps = state => ({
//   posts: state.posts.items,
//   newPost: state.posts.item,
// });

export default App;
