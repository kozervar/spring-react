/**
 * Created by kozervar on 2016-07-24.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import { Application } from './components/Application.jsx';

window.app = ReactDOM.render(<Application />, document.getElementById('content'));