import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

class UserProfile extends Component {
    render() {
        return (
            <div className="App">
                <h1>User Profile</h1>
                <h3>Are you Signed In?</h3>
            </div>
        );
    }
}

export default UserProfile;