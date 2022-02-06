import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from './kReactRedux';
// import { Provider } from 'react-redux';
import ReactReduxHookPage from './pages/ReactReduxHookPage';
import store from './store';

function App() {
  return (
    <div>
      <ReactReduxHookPage />
    </div>
  );
}

export default function render() {
  return ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
