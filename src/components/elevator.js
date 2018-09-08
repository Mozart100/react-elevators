import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { PropTypes } from '../../../node_modules/@types/react-router';


const bodyStyle = {
  background: 'red',
  width: 50,
  height: 50,
  // float:'right',
  margin: '0 auto',
  position: 'relative',
  // top: 0
};


class Elevator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.componentId,
      currentFloor: 1,
      designatedFloor: 1,
      direction: 0,   //-1 0 1 
      top: 0,

    }
  }

  static propTypes = {
    designatedFloor: PropTypes.number.isRequired,
    elevatorId: PropTypes.number.isRequired,
  };

  componentDidMount() {
    // componentWillMount() {

    this.setState({ top: this.calculatePositionOfTheFloor(0) });
    this.timer = setInterval(() => this.TimerAction(), 10); //0.5 for floor height 50 so 10 [ms]
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    console.log('nextProps =',nextProps);
    const { designatedFloor: propDesignatedFloor, elevatorId: propsId } = nextProps;
    const { currentFloor, designatedFloor: stateDesignatedFloor, id: stateId } = prevState;

    if (propsId !== stateId || propDesignatedFloor === stateDesignatedFloor) {
      return prevState;
    }

    // debugger;

    let newState = {
      direction: 1,
      designatedFloor: propDesignatedFloor
    };

    if (currentFloor < propDesignatedFloor) {
      newState = Object.assign({}, newState, { direction: 1 });
    }
    else {
      if (currentFloor === propDesignatedFloor) {
        newState = Object.assign({}, newState, { direction: 0 });
      }
      else {
        newState = Object.assign({}, newState, { direction: -1 })
      };
    }

    var result = Object.assign({}, prevState, newState);

    return result;
  }

  calculateCurrentFlorByPosition(position) {
    return 10 - (position / 50)
  }

  calculatePositionOfTheFloor(floor) {

    return 500 - ((floor * 50) + 50);
  }


  TimerAction() {
    const { currentFloor, designatedFloor, top, direction } = this.state;

    if (currentFloor === designatedFloor && direction !== 0) {
      this.setState({ direction: 0 })
      return;
    }

    let toIncrement = this.calculateCurrentFlorByPosition(top);

    if (direction === 1)
      this.setState({
        top: top - 1,
        currentFloor: toIncrement
      })
    else
      if (direction === -1)
        this.setState({
          top: top + 1,
          currentFloor: toIncrement
        })

  }

  render() {
    let { top } = this.state;
    const mystyle = { ...bodyStyle, top };
    return (
      <div style={{ ...mystyle }}>
        <div >
          <h1>{this.state.top} </h1>
        </div >
      </div>
    );
  }
}

const mapStateToProps = state => ({
  elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
  designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
  // designatedFloor: state.elevetorReducer.elevatorInstruction,
  // currentFloor: state.elevetorReducer.elevatorInstruction.currentFloor,
  // direction: state.elevetorReducer.elevatorInstruction.direction
  // designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
  // direction: state.elevetorReducer.elevatorInstruction.direction
});

export default connect(mapStateToProps, {})(Elevator);