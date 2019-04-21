import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from "./Components/MainPage"

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainPage />
      </Provider>
    );
  }
}

export default App;

