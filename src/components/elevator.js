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
      currentFloor: 1,
      designatedFloor: 1,
      direction: 0,   //-1 0 1 
      top: 0,
      stam: ''
    }
  }

  static propTypes = {
    designatedFloor: PropTypes.number.isRequired,
    direction: PropTypes.number.isRequired,
  };

  componentDidMount() {
    // componentWillMount() {

    this.setState({ top: this.calculatePositionOfTheFloor(0) });
    this.timer = setInterval(() => this.TimerAction(), 10); //0.5 for floor height 50 so 10 [ms]
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    const { designatedFloor } = nextProps;
    const { currentFloor, designatedFloor: stateDesignatedFloor } = prevState;

    if (designatedFloor === stateDesignatedFloor) {
      return;
    }

    let newState = {
      direction: 1,
      designatedFloor: designatedFloor
    };

    if (currentFloor < designatedFloor) {
      newState = Object.assign({}, newState, { direction: 1 });
    }
    else {
      if (currentFloor === designatedFloor) {
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
        {/* {this.props.elevatorVisibility && <div style={{ ...mystyle }}></div>} */}
        {/* {this.props.elevatorVisibility && <div style={{ ...elevatorBody }}></div>} */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  designatedFloor: state.elevetorReducer.floorInstruction.designatedFloor,
  direction: state.elevetorReducer.floorInstruction.direction
});

export default connect(mapStateToProps, {})(Elevator);