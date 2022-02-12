import React from 'react';
import Main from './components/Main';
import { Provider } from 'react-redux';

import { configureStore } from './redux/configureStore';

const store = configureStore()

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>

  );
}


