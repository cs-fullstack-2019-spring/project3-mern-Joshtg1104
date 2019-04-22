import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import './App.css';

class SignUp extends Component {
    render() {
        return (
            <div className="App">
                <h1>Welcome Visitor</h1>
                <h3>Do you wish to create an account?</h3>
            </div>
        );
    }
}

export default SignUp;