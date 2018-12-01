import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const target = document.getElementById('root');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  target
);
process.env.NODE_ENV === 'production'
  ? serviceWorker.register()
  : serviceWorker.unregister();
