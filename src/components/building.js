import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Elevator from './elevator';
import Floors from './floors';
import { initializeElevators } from '../action/elevatorAction';



const commonStyle =
{
  height: 500,

}



const floorsStyle = {
  background: 'green',
  width: 80,
  ...commonStyle,
  // height:500,
  width: 150,
  float: 'left'
  // float:left
  // float:'right'
  // margin: 'auto'
};


const elevatorStyle = {
  background: '#eee',
  ...commonStyle,

  // height:500,
  // width: '100%',
  width: '100px',
  float: 'left'

}

class Building extends Component {

  constructor(props) {
    super(props);

    let elevators = [];

    for (let i = 0; i < 1; i++) {
      elevators.push(i + 1);
    }

    this.state = {
      elevators
    };

  }

  componentDidMount() {
    this.props.initializeElevators(this.props.amountOfElevators,this.props.amountOfFloors);
  }

  // componentWillReceiveProps(nextProps) {

  //   if (nextProps.newPost)
  //     nextProps.posts.unshift(nextProps.newPost);
  // }

  render() {

    console.log('this.state.elevators', this.state.elevators);
    return (
      <div >
        <div >
          <div style={{ ...floorsStyle }}>
            <Floors amountOfFloors={this.props.amountOfFloors} />
          </div>

          <div style={{ ...elevatorStyle }}>
              {this.state.elevators.map(e => <Elevator key={e} componentId={e}/>)}
            {/* <span >
            </span> */}
          </div>

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


