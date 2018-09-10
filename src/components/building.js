import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Elevator from './elevator';
import Floors from './floors';
import { initializeElevators } from '../action/elevatorAction';



// const commonStyle =
// {
//   height: 500,
// }



const floorsStyle = {
  background: 'green',
  width: 80,
  // ...commonStyle,
  width: 150,
  float: 'left'
};


const elevatorStyle = {
  background: '#eee',
  // ...commonStyle,
  width: '100px',
  float: 'left'
}

class Building extends Component {

  constructor(props) {
    super(props);

    let elevators = [];

    for (let i = 0; i < props.amountOfElevators; i++) {
      elevators.push(i + 1);
    }

    this.state = {
      elevators
    };

  }

  componentDidMount() {
    this.props.initializeElevators(this.props.amountOfElevators, this.props.amountOfFloors);
  }

  render() {

    const { amountOfFloors } = this.props;
    const height = amountOfFloors * 50;

    return (
      <div >
        <div >
          <div style={{ ...floorsStyle, height }}>
            <Floors amountOfFloors={amountOfFloors} />
          </div>


          {this.state.elevators.map(e => <div key={e} style={{ ...elevatorStyle, height }}><Elevator componentId={e} amountOfFloors={amountOfFloors}/></div>)}
        </div>
      </div >
    );
  }
}

// Posts.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   posts: PropTypes.array.isRequired,
//   newPost: PropTypes.object
// };

const mapStateToProps = state => ({
  // posts: state.posts.items,
  // newPost: state.posts.item,
});

export default connect(mapStateToProps, { initializeElevators })(Building);
// export default connect(mapStateToProps, { fetchPosts })(Building);


