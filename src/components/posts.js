import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../action/postActions';


class Posts extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     posts: [],
  //   }
  // }

  // componentWillMount() {
  //   fetch('https://jsonplaceholder.typicode.com/posts')
  //     .then(res => res.json())
  //     .then(posts => this.setState({ posts }))
  // }

  render() {
    const posts = this.props.posts.map(x => <div key={x.id}>
      <h3>{x.title}</h3>
      <p>{x.body}</p>
    </div>)

    return (
      <div>
        <h1>Anatoliys Posts</h1>
        {posts}
      </div>
    );
  }
}

Posts.PropTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
};
const mapStateToProps = state => ({
  posts: state.posts.items,
});

export default connect(mapStateToProps, { fetchPosts })(Posts);



// constructor(props) {
//   super(props);

//   this.state = { posts: [] };

// }
// componentWillMount() {

//   fetch('https://jsonplaceholder.typicode.com/posts')
//     .then(res => res.json())
//     // .then(data => console.log(data));
//     .then(data => this.setState({ posts: data }));
// }