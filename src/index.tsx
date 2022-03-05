import * as React from 'react';
import * as ReactDOM from 'react-dom';
import customRender from '../react-special/Lecture5/render';

import App from './App';

// const customRender: null | (() => ReturnType<typeof ReactDOM.render>) = null;

customRender ? customRender() : ReactDOM.render(<App />, document.getElementById('root'));
