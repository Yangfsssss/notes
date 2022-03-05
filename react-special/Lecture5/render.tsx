import { hot } from 'react-hot-loader/root';
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';

const HotApp = hot(App);

export default function render() {
  // return ReactDOM.render(<App />, document.getElementById('root'));
  return ReactDOM.render(
    <Suspense fallback={null}>
      <Provider store={store}>
        <HotApp />
      </Provider>
    </Suspense>,
    document.getElementById('root')
  );
}
