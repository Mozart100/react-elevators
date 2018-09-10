import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {requestedElevator} from '../action/elevatorAction'
import Floor  from './floor';
// import UniquId  from 'react-html-id';

class Floors extends Component {

  constructor(props) {
    super(props);

    // UniquId.enableUniqueIds(this);
    const floors = [];
    for (let i = props.amountOfFloors; i > 0; i--)
      floors.push(i);

    this.state = {
      visibility: true,
      floors: floors
    };
  }

  static PropTypes = {
    amountOfFloors: PropTypes.number.isRequired
  }

  elevatorRequested= (e)=> {
    this.props.requestedElevator(parseInt(e.target.value));
  }


  render() {
    return (
      <div>
        <ul>
          {this.state.floors.map(floor => <Floor key={floor} componentId={floor} clicked={this.elevatorRequested.bind(floor)}/> )}
        </ul>
      </div >
    );
  }
}
// Floors.propTypes = {
//   amountOfFloors: PropTypes.number.isRequired,
// };


// const mapStateToProps = state => ({

//   // posts: state.posts.items,
//   // newPost: state.posts.item,
// });

export default connect(null, { requestedElevator })(Floors);
// export default connect(mapStateToProps, { fetchPosts })(Building);


