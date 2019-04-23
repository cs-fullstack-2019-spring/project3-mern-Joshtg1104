import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

class BlogTweets extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    };


    render() {
        return (
            <div className="App">
                <h1>Blog Posts Here</h1>
                <h3>Are you Signed In?</h3>
            </div>
        );
    }
}

export default BlogTweets;