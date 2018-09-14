import React, { Component } from 'react';

class Elevators extends Component {
  render() {
    return (
      <ul className="elevators">
        {this.state.elevators.map(elevator => 
        <Floor key={elevator} componentHeight={this.state.componentHeight} componentId={elevator} clicked={this.elevatorRequested.bind(elevator)}/> )}
      </ul>
  );
  }
}

const mapStateToProps = state => ({
  // elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
  // designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
});

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevators);