import React from 'react';
import App from './App';
import { Provider } from 'react-redux'
import { initialState as reducerInitialState, reducer } from './redux/reducers'
import { createStore } from 'redux'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from 'test-utils';


test('renders learn react link', () => {
  const { getByLabelText } = render(
  <App />
  );
  const linkElement = getByLabelText(/Jobcoin Address/i);
  expect(linkElement).toBeInTheDocument();
});
