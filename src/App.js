import React from 'react';
import './App.css';
import SnakeLadder from './SnakeLadder';
import { Provider } from 'react-redux';
import store from './configureStore';

console.log(store);

function App() {
  return (
    <Provider
      store={store}
    >
      <SnakeLadder />
    </Provider>
  );
}

export default App;
