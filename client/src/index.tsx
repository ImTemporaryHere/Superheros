import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";

const rootElement = document.getElementById('root')

if(!rootElement) {
  throw new Error('root element not provided')
}

const root = ReactDOM.createRoot(rootElement)

const store = setupStore()

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

