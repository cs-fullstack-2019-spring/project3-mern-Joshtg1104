import React, { Component } from 'react';

import './App.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state={
            data:[],
            image:""
        };
    }

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
                    // image: e.target.image.value
                }),
            })
            .then(data=>data.json())
            .then(data=>{
                console.log("Here is data");
                console.log(data);
                if(data)
                    return this.props.userLoggedIn(data, true);
                else
                    return this.props.userLoggedIn(data, false)
            });
    };

    render() {
        if(this.props.userLogInfo.signedIn){
            console.log(this.props + "A");
            return(
                <div>
                    {/*<img src="LeeMan" alt="" */}
                    {/*{this.props.userLogInfo.image}*/}
                    <img src={this.props.userLogInfo.image} alt=""/>
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
                        <div>
                            <label> Username:
                                <input type="text" name='username' placeholder="Enter username..." autoFocus/>
                            </label>
                        </div>
                        <div>
                            <label> Password:
                                <input type="password" name='password' placeholder="Password here..."/>
                            </label>
                        </div>
                        <br/>
                        <button>Sign-In</button>
                    </form>
                    {this.state.data}
                </div>
            );
        }

    }
}

export default SignIn;