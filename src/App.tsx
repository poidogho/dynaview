import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import './App.css';
import Landing from './modules/landing';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Expense</h1>
        <Landing />
      </div>
    </Provider>
  );
}

export default App;
