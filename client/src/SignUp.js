import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.css';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state={
            notice:"",
        };
    }
    //fetches newuser from user route so that new user account can be created
    submitSignUp=(e)=>{
        e.preventDefault();
        fetch('/users/newuser', {
            method: 'POST',
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName: e.target.firstName.value,
                lastName: e.target.lastName.value,
                email: e.target.email.value,
                username: e.target.username.value,
                password: e.target.password.value,
                image: e.target.image.value,
            }),
        })
            .then(data => data.text())
            .then(response => this.setState({notice:response}))
            .catch((error) => console.log(error));
    };

    render() {
        return (
            //returns form that user uses to create account
            <div className="App">
                <h1>Welcome Visitor</h1>
                <h3>Do you wish to create an account?</h3>
                <form onSubmit={this.submitSignUp}>
                    <p>
                        <label htmlFor={"firstName"}>First Name: </label>
                        <input id={"firstName"} type="text" name="firstName" placeholder="First Name Here..." autoFocus/>
                    </p>
                    <p>
                        <label htmlFor={"lastName"}>Last Name: </label>
                        <input id={"lastName"} type="text" name="lastName" placeholder="Last Name Here..."/>
                    </p>
                    <p>
                        <label htmlFor={"email"}>Email Address: </label>
                        <input id={"email"} type="text" name="email" placeholder="Email Address..."/>
                    </p>
                    <p>
                        <label htmlFor={"username"}>Username: </label>
                        <input id={"username"} type="text" name="username" placeholder="Enter Username..."/>
                    </p>
                    <p>
                        <label htmlFor={"password"}>Password: </label>
                        <input id={"password"} type="text" name="password" placeholder="Enter Password..."/>
                    </p>
                    <p>
                        <label htmlFor={"image"}>Image URL: </label>
                        <input id={"image"} type="text" name="image" placeholder="Image URL Here..."/>
                    </p>
                    <button>Create Account</button>
                </form>
                {this.state.notice}
            </div>
        );
    }
}

export default SignUp;