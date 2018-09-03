import React, { Component } from 'react';

const recStyle = {
  background:'green',
  width:100,
  height:100,
  float:'right',
  margin: '0 auto'
};

const styleBody = {
  background:'#eee',
  // width:100,
  height:500,
  // float:'right'
};

class Elevator extends Component {
  render() {
    return (
      <div style={{...styleBody}}>
        <div style={{...recStyle}}> </div>
      </div>
    );
  }
}

export default Elevator;