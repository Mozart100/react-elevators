import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Elevator from './elevator';


const UlElevators = styled.ul`
  list-style:none;

  >li{
    background: #eee;
    height: ${props => props.itemHeight + 'px'};
    width: 100px;
    float: left;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
`;

class Elevators extends Component {

  constructor(props) {
    super(props);

    this.componentHeight = 50;
  }


  render() {

    const componentHeight = this.componentHeight;
    const { amountOfFloors } = this.props;
    const totalHeight = amountOfFloors * componentHeight;


    console.log('height =', totalHeight);
    console.log('amountOfFloors =', amountOfFloors);


    return (
      <UlElevators itemHeight={totalHeight}>
        {this.props.elevators.map(e =>
          <li key={e} ><Elevator componentId={e} componentHeight={componentHeight} amountOfFloors={amountOfFloors} /></li>)}
      </UlElevators>
      // <UlElevators>
      //   {this.props.elevators.map(e => 
      //     <li key={e} style={{ height }}><Elevator componentId={e} componentHeight={componentHeight} amountOfFloors={amountOfFloors} /></li>)}
      // </UlElevators>


      // <ul className="elevators">
      //   {this.props.elevators.map(e => <li key={e} style={{ height }}><Elevator componentId={e} componentHeight={componentHeight} amountOfFloors={amountOfFloors} /></li>)}
      // </ul>
    );
  }

}

const mapStateToProps = state => ({
  // elevatorId: state.elevetorReducer.elevatorInstruction.elevatorId,
  // designatedFloor: state.elevetorReducer.elevatorInstruction.designatedFloor,
});

export default connect(mapStateToProps, {})(Elevators);
// export default connect(mapStateToProps, { elevatorFloorChanged })(Elevators);