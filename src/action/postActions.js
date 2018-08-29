import { FETCH_POSTS, NEW_POSTS } from './types';

export const fetchPosts =()=> dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(posts => {
      dispatch({
        type: FETCH_POSTS,
        payload: posts
      })
    })
}


export const postNewPost =(post)=> dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: NEW_POSTS,
          payload: data
        })
      })
}



// export default function fetchPosts() {
//   var func = function () {

//   }

//   return func;
// }