import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
    render() {
        const { isAuthenticated, login } = this.props.auth;

        let link;

        if (isAuthenticated()) {
            link = <Link to='profile'>
                View profile
            </Link>;
        } else {
            link = <button onClick={login}>
                Log In
            </button>;
        }

        return (
            <div>
                <h1>Home</h1>
                {link}
            </div>
        );
    }
}

export default Home;