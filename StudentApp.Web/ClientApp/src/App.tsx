import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Dashboard } from './Dashboard/Dashboard.tsx';
import './StyleSheet.css';

export default class App extends Component {
  static displayName = App.name;

  render () {
      return (
          <Switch>
              <Route path="/" component={Dashboard} />
          </Switch>
    );
  }
}
