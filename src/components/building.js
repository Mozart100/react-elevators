import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Floors from './floors';
import Elevator from './elevator';
import Elevators from './elevators';
import { initializeElevators } from '../action/elevatorAction';



class Building extends Component {

  constructor(props) {
    super(props);

    let elevators = [];

    for (let i = 0; i < props.amountOfElevators; i++) {
      elevators.push(i + 1);
    }

    this.state = {
      elevators,
    };

  }


  componentDidMount() {
    this.props.initializeElevators(this.props.amountOfElevators, this.props.amountOfFloors);
  }

  render() {

    const { amountOfFloors } = this.props;

    return (
      <div >
        <Floors amountOfFloors={amountOfFloors} />

        <Elevators elevators={this.state.elevators} amountOfFloors={amountOfFloors}/>
      </div >
    );
  }
}

const mapStateToProps = state => ({
  // posts: state.posts.items,
  // newPost: state.posts.item,
});

export default connect(mapStateToProps, { initializeElevators })(Building);


