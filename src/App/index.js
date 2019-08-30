import { combineReducers } from 'redux';
import { board, status, settings } from './Reducers';

const rootReducer = combineReducers({
  board,
  status,
  settings
});

export default rootReducer;
