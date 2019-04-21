import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from "./Components/MainPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
          <Switch>
            <Route exact path="/" component={MainPage} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;

