import React, { Component } from 'react';

class Posts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }

  componentWillMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(posts => this.setState({ posts }))
  }

  render() {
    const posts = this.state.posts.map(x => <div key={x.id}>
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

export default Posts;



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