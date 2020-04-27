import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { initialState as reducerInitialState } from '../redux/reducers/index';
import rootReducer from "../redux/reducers";
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunkMiddleware from 'redux-thunk';
import { LocalStorage } from './LocalStorage';

if (typeof global._sessionStorage !== 'undefined') {
  Object.defineProperty(global, '_sessionStorage', {
    value: new LocalStorage(jest),
    writable: false,
  });
} else {
  global.sessionStorage = new LocalStorage(jest);
}

function render(
  ui,
  {
    initialState = reducerInitialState,
    store = createStore(rootReducer, initialState, applyMiddleware(
      thunkMiddleware
  )),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    const history = createMemoryHistory();
    return <Provider store={store}>
      <Router history={history}>
      {children}
      </Router>
      </Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }