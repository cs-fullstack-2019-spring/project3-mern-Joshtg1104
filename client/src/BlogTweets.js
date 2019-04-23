import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

class BlogTweets extends Component {
    constructor(props) {
        super(props);
        this.state={
            signedIn: false,
            message:"",
        }
    };

    submitTweet=(e)=>{
        e.preventDefault();
        fetch('/users/addTweet', {
            method: 'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: this.props.userLogInfo.username,
                post: e.target.post.value,
            }),
        })
            .then(data=>data.text())
            .then(response=>this.setState({message: response}));
    };


    render() {
        if(!this.props.userLogInfo.signedIn){
            return(
                <div>
                    <h1>SQUUAAAAAAWK!! LOG IN FIRST!</h1>
                </div>
            );
        }
        else{
            return(
                <div>
                    <h1>Welcome {this.props.userLogInfo.username}</h1>
                    <form onSubmit={this.submitTweet}>
                        <p>
                            <label htmlFor={"post"}>Add Post</label>
                            <textarea id={"post"} name={"post"} placeholder={"Add Post..."} autoFocus/>
                        </p>
                        <button>SQUAWK</button>
                    </form>
                    {this.state.message}
                </div>
            )
        }
        return (
            <div className="App">
                <h1>Blog Posts Here</h1>
                <h3>Are you Signed In?</h3>
            </div>
        );
    }
}

export default BlogTweets;