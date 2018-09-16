import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// const 



class Floor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      componentId: props.componentId,
      elevatorLocationFloor: '',
      componentHeight: this.props.componentHeight
    }
  }

  static propTypes = {
    FloorComponentId: PropTypes.number.isRequired,
    elevatorLocationFloor: PropTypes.number.isRequired,
    elevatorId: PropTypes.number.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {

    let newState = Object.assign({}, prevState);
    const { FloorComponentId, elevatorLocationFloor, elevatorId, direction } = nextProps;
    if (prevState.componentId === FloorComponentId) {

      let msg = elevatorLocationFloor;
      if (+elevatorLocationFloor === FloorComponentId) {
        if (direction === 0)
          msg = "Bording"
        else
          msg = ""

      }

      newState = Object.assign(newState, { elevatorLocationFloor: msg, elevatorId });
    }
    else {
      if (elevatorId === prevState.elevatorId) {
        newState = Object.assign(newState, { elevatorLocationFloor: '' });
      }
    }
    return newState;
  }

  render() {
    const { elevatorLocationFloor } = this.state;
    return (
      <div>
        {elevatorLocationFloor && "(" + elevatorLocationFloor + ") "}
        <button onClick={this.props.clicked} value={this.props.componentId}> {this.props.componentId} </button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  FloorComponentId: state.elevetorReducer.floorNotified.designatedFloorId,
  elevatorLocationFloor: state.elevetorReducer.floorNotified.elevatorLocationFloor,
  elevatorId: state.elevetorReducer.floorNotified.elevatorId,
  direction: state.elevetorReducer.floorNotified.direction,
});

export default connect(mapStateToProps, {})(Floor);