import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './style/floors-style.css'

// const 



class Floor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      componentId: props.componentId,
      elevatorLocationFloor: 0,
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
    const { FloorComponentId, elevatorLocationFloor, elevatorId } = nextProps;
    if (prevState.componentId === FloorComponentId) {
      newState = Object.assign(newState, { elevatorLocationFloor: elevatorLocationFloor, elevatorId });
    }
    else {
      if (elevatorId === prevState.elevatorId) {
        newState = Object.assign(newState, { elevatorLocationFloor: 0 });
      }
    }
    return newState;
  }

  render() {
    const { elevatorLocationFloor, componentHeight: height } = this.state;
    return (
      <div>
        {elevatorLocationFloor > 0 && elevatorLocationFloor}
        <button onClick={this.props.clicked} value={this.props.componentId}> {this.props.componentId} </button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  FloorComponentId: state.elevetorReducer.floorNotified.designatedFloorId,
  elevatorLocationFloor: state.elevetorReducer.floorNotified.elevatorLocationFloor,
  elevatorId: state.elevetorReducer.floorNotified.elevatorId,
});

export default connect(mapStateToProps, {})(Floor);