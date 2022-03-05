import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class HomePage extends Component {
  componentDidMount() {
    // console.log('componentDidMount'); //sy-log
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount'); //sy-log
  }
  render() {
    // console.log("HomePage props", this.props); //sy-log

    // return <Redirect to="/welcome" />;

    return (
      <Route>
        <div>
          <h3>HomePage</h3>
        </div>
      </Route>
    );
  }
}

export default HomePage;
