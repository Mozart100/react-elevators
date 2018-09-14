import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import store from './store'
import { injectGlobal } from 'styled-components';

injectGlobal`
* {
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family: sans-serif;
}
`; 





ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
