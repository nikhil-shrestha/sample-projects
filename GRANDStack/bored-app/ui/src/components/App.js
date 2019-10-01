import React, { Component } from 'react';
import Activity from './Activity';
import Search from './Search';
import {BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: 'Wash your car'
       
    }
  }

  setSearchTerm = (query) => {
    this.setState({query});
    console.log("setSearchTerm called 23");
    console.log(query);
  };

  render() {
    const {query} = this.state;
    return (
        <div className="ph3 pv1 background-gray">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/activity" />} />     
            <Route exact path="/search" component={Search} />
            <Route exact path="/activity" component={Activity} />     
          </Switch>
          </BrowserRouter>
          </div>
        )
  }

}

export default App;