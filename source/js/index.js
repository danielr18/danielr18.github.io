import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'babel-polyfill';
import logger from 'dev/logger';

import rootReducer from 'reducers';
import DevTools from 'dev/redux-dev-tools';

import App from 'views/App';
import Dashboard from 'views/Dashboard';

// Load SCSS
import '../scss/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let store = null;

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk);

  store = createStore(
    rootReducer,
    middleware
  );
} else {
  // In development mode beside thunk
  // logger and DevTools are added
  const middleware = applyMiddleware(thunk, logger);
  const enhancer = compose(
    middleware,
    DevTools.instrument()
  );

  store = createStore(
    rootReducer,
    enhancer
  );
}


// Render it to DOM
ReactDOM.render(
  <Provider store={ store }>
    { isProduction ?
      <App><Dashboard /></App> :
      <div>
        <App><Dashboard /></App>
        <DevTools />
      </div> }
  </Provider>,
  document.getElementById('root')
);
