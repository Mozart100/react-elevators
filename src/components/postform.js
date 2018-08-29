import React, { Component } from 'react';



class Postform extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: ''
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    // e.preventdefault
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    // e.preventDefault();
    const post = {
      title: this.state.title,
      body: this.state.body
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  render() {
    return (
      <div>
        <h1>Single Post</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <div>
              <label>Title:</label>
              <br />
              <input type="text" name="title" value={this.state.title} onChange={this.onChange} />
            </div>
            <br />
            <div>
              <label>Body:</label>
              <br />
              <textarea name="body" value={this.state.body} onChange={this.onChange} />
            </div>
            <br />
            <button type="submit" >Submit </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Postform;