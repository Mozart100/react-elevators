import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import elevatorImage from './Images/elv.png';
import { elevatorFloorChanged } from '../action/elevatorAction'
import soundFile from '../components/Audio/ding.mp3'
import './style/elevator-style.css'


class Elevator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      id: this.props.componentId,
      currentFloor: 1,
      designatedFloor: 1,
      direction: 0,   //-1 0 1 
      top: 0,
      delay: -1,
      amountOfFloors: this.props.amountOfFloors,
      componentHeight: 50
      // componentHeight: this.props.componentHeight

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
    // console.log('Request From Elevator to get to =', propDesignatedFloor);
    return Object.assign({}, prevState, { designatedFloor: propDesignatedFloor, direction });
  }


  runAudio = () => {

    // const sound = new Audio(soundFile);
    // sound.play();
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
      this.runAudio();
      // if (currentFloor === designatedFloor && direction !== 0) {
      this.setState({ direction: 0, delay: 100 }) // 2 seconds beacuse each and every 10 ms it is invoked!
      this.props.elevatorFloorChanged(elevatorId, designatedFloor, 0, designatedFloor);
      return;
    }

    let newCurrentFloor = this.calculateCurrentFloorByPosition(top);

    //refactoring requires!
    if (Math.floor(newCurrentFloor) === newCurrentFloor && newCurrentFloor !== currentFloor && newCurrentFloor !== designatedFloor) {
      this.props.elevatorFloorChanged(elevatorId, newCurrentFloor, direction, designatedFloor);
    }

    if (direction === 1)
      this.setState({
        top: top - 1,
        currentFloor: newCurrentFloor
      })
    else
      if (direction === -1)
        this.setState({
          top: top + 1,
          currentFloor: newCurrentFloor
        })

  }

  calculateCurrentFloorByPosition(position) {
    return this.state.amountOfFloors - (position / this.state.componentHeight)
    // return 10 - (position / 50)
  }

  calculatePositionOfTheFloor(floor) {
    const height = (this.state.amountOfFloors * this.state.componentHeight);
    return height - ((floor * this.state.componentHeight) + this.state.componentHeight);
    // return 500 - ((floor * 50) + 50);
  }

  render() {
    const { top } = this.state;
    // const mystyle = { ...bodyStyle, top, height };
    return (
      <img className="elevator" src={elevatorImage}  style={{top}}/>
      // <img className="elevator" src={elevatorImage} style={{ ...mystyle }} />
    );
  }
}

const mapStateToProps = state => ({
  elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
  designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
});

export default connect(mapStateToProps, { elevatorFloorChanged })(Elevator);