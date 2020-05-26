import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './assets/fonts/fontawesome2/all.css';
import './assets/fonts/nunito.css';
import './assets/scss/main.scss';

import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('wrapper'));
