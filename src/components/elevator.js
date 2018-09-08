import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { elevatorFloorChanged } from '../action/elevatorAction'



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
      delay: -1
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

    const { designatedFloor: propDesignatedFloor, elevatorId: propsId } = nextProps;
    const { currentFloor, designatedFloor: stateDesignatedFloor, id: stateId } = prevState;

    if (propsId !== stateId || propDesignatedFloor === stateDesignatedFloor) {
      return prevState;
    }

    let direction = 0;
    if (currentFloor < propDesignatedFloor) {
      direction = 1;
    }
    else {
      if (currentFloor > propDesignatedFloor) {
        direction = -1;
      };
    }
    console.log('Request From Elevator to get to =', propDesignatedFloor);
    return Object.assign({}, prevState, { designatedFloor: propDesignatedFloor, direction });
  }




  TimerAction() {
    const { currentFloor, designatedFloor, top, direction, delay, id: elevatorId } = this.state;

    if (delay > 0) {
      this.setState({ delay: delay - 1 }) // waiting for 2 [second]
      return;
    }

    if (direction === 0) {
      return;
    }

    if (currentFloor === designatedFloor) {
    // if (currentFloor === designatedFloor && direction !== 0) {
      this.setState({ direction: 0, delay: 100 }) // 2 seconds beacuse each and every 10 ms it is invoked!
      this.props.elevatorFloorChanged(elevatorId, designatedFloor, 0, designatedFloor);
      return;
    }

    let toIncrement = this.calculateCurrentFloorByPosition(top);

    if (Math.floor(toIncrement) === toIncrement && toIncrement !== currentFloor) {
      // console.log('designatedFloor',designatedFloor);
      this.props.elevatorFloorChanged(elevatorId, toIncrement, direction, designatedFloor);
      // console.log('xxxxxdesignatedFloor',designatedFloor);

    }

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



    // if (currentFloor === designatedFloor) {
    //   this.setState({ direction: 0, delay: 100 }) // 2 seconds beacuse each and every 10 ms it is invoked!
    //   return;
    // }

    // if (Math.floor(toIncrement) === toIncrement && toIncrement !== currentFloor) {
    //   this.props.elevatorFloorChanged(elevatorId, toIncrement, direction, designatedFloor);

    // }

  }

  calculateCurrentFloorByPosition(position) {
    return 10 - (position / 50)
  }

  calculatePositionOfTheFloor(floor) {
    return 500 - ((floor * 50) + 50);
  }

  render() {
    let { top } = this.state;
    const mystyle = { ...bodyStyle, top };
    return (
      <div style={{ ...mystyle }}>
        <div >
          <div>{this.state.top} </div>
        </div >
      </div>
    );
  }
}

const mapStateToProps = state => ({
  elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
  designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
});

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevator);