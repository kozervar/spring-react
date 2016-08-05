/**
 * Created by kozervar on 2016-08-05.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import Html from '../client/components/Html';
import Application from '../client/components/Application.jsx';

const SCRIPT_PATH = '/webresources/';

function renderServerSide(parameters) {
    let script = SCRIPT_PATH + 'client.js';
    let css = new Set();
    let style = [...css].join('');
    let content = ReactDOMServer.renderToString( <Application /> );
    console.log(content);
    return ReactDOMServer.renderToStaticMarkup(
        <Html
            title="My awesome application"
            description="My super duper description"
            style={style}
            script={script}
            >
            {content}
        </Html>
    );
}

__APPLICATION__.renderServerSide = renderServerSide;