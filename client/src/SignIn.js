import React, { Component } from 'react';

import './App.css';

class SignIn extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state={
    //         data:[],
    //     };
    // }

    submitLogin=(e)=>{
        e.preventDefault();
        console.log("Loggingg In... Logged In");
        fetch('/users/login',
            {
                method: 'POST',
                headers:{
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                }),
            })
            .then(data=>{return data.text()})
            .then(data=>{
                if(data)
                    return this.props.userLoggedIn(data, true);
                else
                    return this.props.userLoggedIn(data, false)
            });
    };

    render() {
        if(this.props.userLoggedIn){
            return(
                <div>
                    <h1>Hello {this.props.userLogInfo.username}</h1>
                </div>
            );
        }
        else{
            return (
                <div className="App">
                    <h1>Sign-In</h1>
                    <h3>Come on and Log In</h3>
                    <form onSubmit={this.submitLogin}>
                        <label> Username:
                            <input type="text" name='username' placeholder="Enter username..." autoFocus/>
                        </label>
                        <label> Password:
                            <input type="text" name='password' placeholder="Password here..."/>
                        </label>
                        <button>Sign-In</button>
                    </form>
                    {this.state.data}
                </div>
            );
        }

    }
}

export default SignIn;