import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { elevatorLaunch } from '../component/../action/elevatorAction';
import {requestedElevator} from '../action/elevatorAction'
import Floor  from './floor';
// import UniquId  from 'react-html-id';




const contentStyle = {
  // display:flex
  // background: 'green',
  // position: 'absolute',

  // width: 80,
  // height: 500,
  // width: 150,
  // float: 'left'
  // float:left
  // float:'right'
  // margin: 'auto'


};


class Floors extends Component {

  constructor(props) {
    super(props);

    // UniquId.enableUniqueIds(this);
    const floors = [];
    for (let i = 10; i > 0; i--)
      floors.push(i);

    this.state = {
      visibility: true,
      floors: floors
    };
  }

  // componentWillMount() {
  //   const floors = [];//Array(this.props.amountOfFloors);
  //   for (let i = 0; i < 10; i++)
  //     // for (let i = 0; i < this.props.amountOfFloors; i++)
  //     floors.push(i);
  //   // this.state.floors.push(i);

  //   this.setState({ floors });
  // }

  elevatorRequested= (e)=> {
  //  console.log('button Id', e.target.value);
    // this.props.requestedElevator(e.target.value + '');
    this.props.requestedElevator(parseInt(e.target.value));
  }


  render() {
    return (
      <div style={{ ...contentStyle }}>
        
        <ul>
          {this.state.floors.map((elevator,index) => <Floor key={index} id={elevator} clicked={this.elevatorRequested.bind(elevator)}/> )}
          {/* {this.state.floors.map((elevator) => <li key={elevator} style={{...buttonContentStyle}}><button type="button"  > {elevator} </button></li> )} */}
        </ul>
      </div >
    );
  }
}
Floors.propTypes = {
  amountOfFloors: PropTypes.number.isRequired,
};


// const mapStateToProps = state => ({

//   // posts: state.posts.items,
//   // newPost: state.posts.item,
// });

export default connect(null, { requestedElevator })(Floors);
// export default connect(mapStateToProps, { fetchPosts })(Building);


