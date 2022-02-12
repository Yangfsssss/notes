import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

export default function render() {
  return ReactDOM.render(<App />, document.getElementById('root'));
}
