import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from "./Components/MainPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { checkStatus } from './actions/usersRequests'

class App extends React.Component {
  render() {
    //setInterval(checkStatus, 10000);
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

