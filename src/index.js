import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as atatus from 'atatus-spa';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
atatus.config('f3dd420b22c04fc386c9fb2edfe48907').install();
