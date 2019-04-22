import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './App.css';

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLogInfo: {
                username: null,
                signedIn: false,
            },
        };
    }

    componentDidMount() {
        this.isThereUser();
    }

    isThereUser(){
        fetch('/users')
            .then(data=>{
                return data.text();
            })
            .then(response=>{
                if(response){
                    this.setState(
                        {
                            userLogInfo:{
                                username:response,
                                signedIn: true,
                            }
                        });
                }
                else{
                    this.setState(
                        {
                            userLogInfo:{
                                username:null,
                                signedIn: false,
                            }
                        });
                }
            });
    }

    userLoggedIn=(username, signedIn)=>{
        console.log("Got It!");
        this.setState({
            userLogInfo:{
                username: username,
                signedIn: signedIn,
            }
        });
    };
    userLoggedOut=()=>{
        fetch('/users/logout')
            .then(data=>{return data.text()})
            .then(data=>console.log(data))
            .then(()=>this.userLoggedIn(undefined, false))
            .catch(()=>console.log("REJECTED!"));
    };

    render() {
        return(
            <div>
                <Router>
                    <h1>Welcome Visitor</h1>

                    <Link to='/'>Home</Link>
                    <Link to='/userprofile'>Profile</Link>
                    <Link to='/signup'>Sign-Up</Link>

                    <Route path='/' component={()=>{return <SignIn userLogInfo={this.state.userLogInfo} userLoggedIn={this.userLoggedIn}/>}}/>
                    <Route path='/userprofile' component={UserProfile}/>
                    <Route path='/signup' component={SignUp}/>
                 </Router>
            </div>
        )
    }

}export default HomePage