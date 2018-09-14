import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Floors from './floors';
import Elevator from './elevator';
import Elevators from './elevators';
import { initializeElevators } from '../action/elevatorAction';


// const elevatorStyle = {
//   background: '#eee',
//   width: '100px',
//   float: 'left'
// }

class Building extends Component {

  constructor(props) {
    super(props);

    let elevators = [];

    for (let i = 0; i < props.amountOfElevators; i++) {
      elevators.push(i + 1);
    }

    this.state = {
      elevators,
      componentHeight: this.props.componentHeight
    };

  }

  static propTypes = {
    componentHeight: PropTypes.number.isRequired,
  };

  componentDidMount() {
    this.props.initializeElevators(this.props.amountOfElevators, this.props.amountOfFloors);
  }

  render() {

    const { amountOfFloors } = this.props;
    const { componentHeight } = this.state;
    const height = amountOfFloors * componentHeight;

    return (
      <div >
        <Floors amountOfFloors={amountOfFloors} />

        {/* <Elevators /> */}
        <ul className="elevators">
          {this.state.elevators.map(e => <li key={e} style={{ height }}><Elevator componentId={e} componentHeight={componentHeight} amountOfFloors={amountOfFloors} /></li>)}
          {/* {this.state.elevators.map(e => <li key={e} style={{ ...elevatorStyle, height }}><Elevator componentId={e} componentHeight={componentHeight} amountOfFloors={amountOfFloors} /></li>)} */}
        </ul>
        {/* {this.state.elevators.map(e => <div key={e} style={{ ...elevatorStyle, height }}><Elevator componentId={e} componentHeight={componentHeight} amountOfFloors={amountOfFloors} /></div>)} */}

      </div >
    );
  }
}

const mapStateToProps = state => ({
  // posts: state.posts.items,
  // newPost: state.posts.item,
});

export default connect(mapStateToProps, { initializeElevators })(Building);


