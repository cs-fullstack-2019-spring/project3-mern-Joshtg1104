import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link,} from "react-router-dom";
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './App.css';
import LogOut from "./LogOut";

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

    isThereUser() {
        fetch('/users')
            .then(data => {
                return data.text();
            })
            .then(response => {
                if (response) {
                    this.setState(
                        {
                            userLogInfo: {
                                username: response,
                                signedIn: true,
                            }
                        });
                } else {
                    this.setState(
                        {
                            userLogInfo: {
                                username: null,
                                signedIn: false,
                            }
                        });
                }
            });
    }

    userLoggedIn = (username, signedIn) => {
        console.log("Got It!");
        // console.log(username + "&"+ signedIn);
        this.setState({
            userLogInfo: {
                username: username,
                signedIn: signedIn,
            }
        });
    };
    userLogOut = () => {
        this.setState({
            userLogInfo: {
                username: null,
                signedIn: false,
            }
        });
        fetch('/users/logout')
            .then(data => {
                return data.text()
            })
            .then(data => console.log(data))
            .then(() => this.userLoggedIn(null, false))
            .catch(() => console.log("REJECTED!"));
    };

    render() {
        // console.log(this.state.signedIn + "work ");
        if (this.state.userLogInfo.signedIn === false) {
            return (
                <div>
                    <Router>
                        <h1>Welcome Visitor</h1>

                        <Link to='/'>Home</Link>
                        <Link to='/userprofile'>Profile</Link>
                        <Link to='/signup'>Sign-Up</Link>
                        {/*<Link to='/signin'>Log In</Link>*/}

                        <Route exact path='/' component={()=>{return <SignIn userLogInfo={this.state.userLogInfo} userLoggedIn={this.userLoggedIn}/>}}/>
                        {/*<Route exact path='/signin' component={() => {*/}
                        {/*    return <SignIn userLogInfo={this.state.userLogInfo} userLoggedIn={this.userLoggedIn}/>*/}
                        {/*}}/>*/}
                        <Route exact path='/userprofile' component={UserProfile}/>
                        <Route exact path='/signup' component={()=><SignUp/>}/>
                    </Router>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Router>
                        <h1>Welcome</h1>

                        <Link to='/'>Home</Link>
                        <Link to='/userprofile'>Profile</Link>
                        <Link to='/logout' onClick={this.userLogOut}>Log Out</Link>

                        <Route exact path='/' component={()=>{return <SignIn userLogInfo={this.state.userLogInfo} userLoggedIn={this.userLoggedIn}/>}}/>
                        <Route exact path='/userprofile' component={UserProfile}/>
                        <Route path='/logout' component={() => <LogOut/>}/>
                    </Router>
                </div>
            )
        }

    }

}

export default HomePage