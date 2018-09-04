import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Elevator from './elevator';
import Floors from './floors';


// const buildingStyle = {
//   background: '#eee',
//   height: '500px',
// };

const commonStyle =
{
  height: 500,

}

const elevatorStyle = {
  background: '#eee',
  ...commonStyle,

  // height:500,
  width: '100%',
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

class Building extends Component {

  // componentWillMount() {
  //   this.props.fetchPosts();
  // }

  // componentWillReceiveProps(nextProps) {

  //   if (nextProps.newPost)
  //     nextProps.posts.unshift(nextProps.newPost);
  // }

  render() {

    return (
      <div >
        <div >
          <div style={{ ...floorsStyle }}>
            <Floors amountOfFloors={this.props.amountOfFloors} />
          </div>

          <div style={{ ...elevatorStyle }}>
            <Elevator />
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

export default connect(mapStateToProps, {})(Building);
// export default connect(mapStateToProps, { fetchPosts })(Building);


