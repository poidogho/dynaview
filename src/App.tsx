import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';
import Landing from './modules/landing/index';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Landing />
      </div>
    </Provider>
  );
}

export default App;
