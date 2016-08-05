/**
 * Created by kozervar on 2016-08-05.
 */
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import { readState, saveState } from 'history/lib/DOMStateStorage';
import history from '../core/history';
import {
    addEventListener,
    removeEventListener,
    windowScrollX,
    windowScrollY,
} from '../core/DOMUtils';

import Application from './components/Application'

// Restore the scroll position if it was saved into the state
//function restoreScrollPosition(state) {
//    if (state && state.scrollY !== undefined) {
//        window.scrollTo(state.scrollX, state.scrollY);
//    } else {
//        window.scrollTo(0, 0);
//    }
//}

/**
 * Render complete
 * @param state
 * @param callback
 */
let renderComplete = (state, callback) => {
    const elem = document.getElementById('css');
    if (elem) elem.parentNode.removeChild(elem);
    callback(true);
    renderComplete = (s) => {
        //restoreScrollPosition(s);

        // Google Analytics tracking. Don't send 'pageview' event after
        // the initial rendering, as it was already sent
        if (window.ga) {
            window.ga('send', 'pageview');
        }

        callback(true);
    };
};

/**
 * Render
 * @param container
 * @param state
 * @param component
 * @returns {Promise}
 */
function render(container, state, component) {
    return new Promise((resolve, reject) => {
        try {
            ReactDOM.render(
                component,
                container,
                renderComplete.bind(undefined, state, resolve)
            );
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Run task
 */
function run() {
    const container = document.getElementById('app');
    let currentLocation = history.getCurrentLocation();

    function onLocationChange(location) {
        // Save the page scroll position into the current location's state
        //if (currentLocation.key) {
        //    saveState(currentLocation.key, {
        //        ...readState(currentLocation.key),
        //        scrollX: windowScrollX(),
        //        scrollY: windowScrollY(),
        //    });
        //}
        currentLocation = location;

        // Render
        render(container, null, <Application />);
    }
    const removeHistoryListener = history.listen(onLocationChange);
    history.replace(currentLocation);

    // https://developers.google.com/web/updates/2015/09/history-api-scroll-restoration
    //let originalScrollRestoration;
    //if (window.history && 'scrollRestoration' in window.history) {
    //    originalScrollRestoration = window.history.scrollRestoration;
    //    window.history.scrollRestoration = 'manual';
    //}

    addEventListener(window, 'pagehide', function onPageHide() {
        removeEventListener(window, 'pagehide', onPageHide);
        removeHistoryListener();
        //if (originalScrollRestoration) {
        //    window.history.scrollRestoration = originalScrollRestoration;
        //    originalScrollRestoration = undefined;
        //}
    });
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
    run();
} else {
    document.addEventListener('DOMContentLoaded', run, false);
}