import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import './assets/fonts/fontawesome2/all.css';
import './assets/fonts/nunito.css';
import './assets/scss/main.scss';

import { Router, BrowserRouter } from "react-router-dom";
import history from "./history";

import { baseName } from "./config";


ReactDOM.render(
        <BrowserRouter basename={ baseName }>
            <Router history={history}>
                <App />
            </Router>
        </BrowserRouter>,
    document.getElementById('wrapper'));
