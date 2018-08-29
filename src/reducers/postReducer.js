import { FETCH_POSTS, NEW_POSTS } from '../action/types';


const initialState = {
  items: [],
  item: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:

      console.log('FETCH_POSTS - Executed!');
      return {
        ...state,
        items: action.payload
      }
    default:
      return state;
  }
}