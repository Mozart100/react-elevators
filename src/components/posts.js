import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../action/postActions';


class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  static propTypes = {
      fetchPosts: PropTypes.func.isRequired,
      posts: PropTypes.array.isRequired,
      newPost: PropTypes.object
    };

  componentWillReceiveProps(nextProps) {
    // debugger;
    if (nextProps.newPost)
      nextProps.posts.unshift(nextProps.newPost);
    // console.log(`componentWillReceiveProps -${nextProps.newPost}`);
  }

  render() {
    const posts = this.props.posts.map((user,index) => <div key={index}>
      <h2>{user.id}</h2>
      <h3>{user.title}</h3>
      <p>{user.body}</p>
    </div>)

    return (
      <div>
        <h1>Anatoliys Posts</h1>
        {posts}
      </div>
    );
  }
}

// Posts.propTypes = {
//   fetchPosts: PropTypes.func.isRequired,
//   posts: PropTypes.array.isRequired,
//   newPost: PropTypes.object
// };

const mapStateToProps = state => ({
  posts: state.posts.items,
  newPost: state.posts.item,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);


