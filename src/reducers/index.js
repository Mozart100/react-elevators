import {combineReducers} from 'redux';
import postReducer from './postReducer';
import elevetorReducer from './elevetorReducer';

export default combineReducers ({
  posts:postReducer,
  elevetorReducer:elevetorReducer
});

