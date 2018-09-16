import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestedElevator } from '../action/elevatorAction'
import Floor from './floor';
// import UniquId  from 'react-html-id';
import styled from 'styled-components';

const FloorStyled = styled.ul`
  list-style: none;
  width: 120px;
  float: left

  > li {
    border-bottom:1px solid black;
    border-left:1px solid black;
    border-right:1px solid black;
    background: green;
    height: 50px;
    text-align: center;

    > div > button {
      margin-top:10px;  
      height: 30px;
      width: 30px;
      border-radius: 30px;
      background-color: lightgreen;
    }
  }
 
`;

class Floors extends Component {

  constructor(props) {
    super(props);

    // UniquId.enableUniqueIds(this);
    const floors = [];
    for (let i = props.amountOfFloors; i > 0; i--)
      floors.push(i);

    this.state = {
      visibility: true,
      floors: floors,
    };
  }

  static propTypes = {
    amountOfFloors: PropTypes.number.isRequired
  }

  elevatorRequested = (e) => {
    this.props.requestedElevator(parseInt(e.target.value));
  }


  render() {
    return (
      <FloorStyled >
        {this.state.floors.map(floor => <li key={floor}> <Floor componentId={floor} clicked={this.elevatorRequested.bind(floor)} /></li>)}
        {/* {this.state.floors.map(floor => <Floor key={floor} componentId={floor} clicked={this.elevatorRequested.bind(floor)} />)} */}
      </FloorStyled>
      // <ul className="floors">
      //   {this.state.floors.map(floor => <li key={floor}> <Floor componentId={floor} clicked={this.elevatorRequested.bind(floor)} /></li>)}
      //   {/* {this.state.floors.map(floor => <Floor key={floor} componentId={floor} clicked={this.elevatorRequested.bind(floor)} />)} */}
      // </ul>
    );
  }
}

export default connect(null, { requestedElevator })(Floors);


