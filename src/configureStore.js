import { createStore, applyMiddleware, compose } from "redux";
import app from './App/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

function configureStore(){
  const middlewares = [
    thunk,
    logger
  ];

  return createStore(app, applyMiddleware(...middlewares));
}

export default configureStore();