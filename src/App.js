import React, { Component } from 'react';
import Home from './Home';
import Profile from './Profile';
import Nav from './Nav';
import Auth from './Auth/Auth';
import AuthContext from './Auth/AuthContext';
import PrivateRoute from './Auth/PrivateRoute';
import PublicRoute from './Auth/PublicRoute';
import Callback from './Callback';
import Public from './Public';
import Private from './Private';
import Courses from './Courses';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: new Auth(this.props.history),
      tokenRenewalComplete: false
    };
  }

  componentDidMount() {
    this.state.auth.renewToken(() =>
      this.setState({ tokenRenewalComplete: true })
    );
  }

  render() {
    const { auth } = this.state;

    // Show loading message until the token renewal check is completed.
    if (!this.state.tokenRenewalComplete)
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );

    return (
      <AuthContext.Provider value={auth}>
        <Nav auth={auth} />
        <div className='body'>
          <PublicRoute path='/' exact component={Home} />
          <PublicRoute path='/callback' component={Callback} />
          <PrivateRoute path='/profile' component={Profile} />
          <PublicRoute path='/public' component={Public} />
          <PrivateRoute path='/private' component={Private} />
          <PrivateRoute
            path='/courses'
            component={Courses}
            scopes={["read:courses"]}
          />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
