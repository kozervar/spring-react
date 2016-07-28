/**
 * Created by kozervar on 2016-07-24.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import { Application } from './../client/components/Application.jsx';

__APPLICATION__.React = React;
__APPLICATION__.ReactDOM = ReactDOM;
__APPLICATION__.ReactDOMServer = ReactDOMServer;
__APPLICATION__.Application = Application;