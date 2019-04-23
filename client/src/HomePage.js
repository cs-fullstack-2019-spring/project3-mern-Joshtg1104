import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link,} from "react-router-dom";
import UserProfile from './UserProfile';
import SignUp from './SignUp';
import SignIn from './SignIn';
import './App.css';
import LogOut from "./LogOut";
import BlogTweets from "./BlogTweets";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userLogInfo: {
                username: null,
                image: null,
                signedIn: false,
            },
            posts:[],
        };
    }

    componentDidMount() {
        console.log(this.state.userLogInfo.signedIn);
        this.isThereUser();
        this.displayPosts();
    }

    isThereUser() {
        console.log("is There a User");
        fetch('/users')
            .then(data => {
                return data.text();
            })
            .then(response => {
                if (response) {
                    console.log("Here is what the server is responding with");
                    console.log(response);
                    this.setState(
                        {
                            userLogInfo: {
                                username: response,
                                image: response,
                                signedIn: true,
                            }
                        });
                } else {
                    this.setState(
                        {
                            userLogInfo: {
                                username: null,
                                image: null,
                                signedIn: false,
                            }
                        });
                }
            });
    }

    displayPosts=()=>{
        fetch('/users/postList')
            .then(posts => posts.json())
            .then(postData=> this.setState({posts: postData}))
    };

    userLoggedIn = (username, image, signedIn) => {
        console.log("Got It!");
         console.log(username + " & " + " & " + signedIn);
        this.setState({
            userLogInfo: {
                username: username,
                image: image,
                signedIn: signedIn,
            }
        });
    };
    userLogOut = () => {
        this.setState({
            userLogInfo: {
                username: null,
                image: null,
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
        let postList = this.state.posts.map(
            (post) => {
                return(
                    <div>
                        <p>{post.username}</p>
                        <p>{post.post}</p>
                        <hr/>
                    </div>
                )
            }
        );
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
                    {postList}
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
                        <Route exact path='/userprofile' component={()=>{return <BlogTweets userLogInfo={this.state.userLogInfo} userLoggedIn={this.userLoggedIn}/>}}/>
                        <Route path='/logout' component={() => <LogOut/>}/>
                    </Router>
                    {postList}
                </div>
            )
        }

    }

}

export default HomePage