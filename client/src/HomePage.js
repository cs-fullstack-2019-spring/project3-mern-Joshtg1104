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
                signedIn: false,
            },
            image: null,
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
                                // image: response,
                                signedIn: true,
                            }
                        });
                } else {
                    this.setState(
                        {
                            userLogInfo: {
                                username: null,
                                // image: null,
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

    // mappedPostFunction(){
    //     let postArray = [];
    //     console.log(this.state.postData + "B");
    //     let subArray = [];
    //     if(this.state.postData)
    //         subArray = this.state.postData;
    //     if(subArray.length>0){
    //         postArray = this.state.postData.map(
    //             (eachItem, index) => {
    //                 return(<div key={index}>
    //                     <p>{eachItem.userLogInfo.username}</p>
    //                     <p>{eachItem.userLogInfo.post}</p>
    //                 </div>)
    //             }
    //         );
    //         console.log(postArray);
    //     }
    //     else{
    //         console.log("no data for " + this.state.userLogInfo.username);
    //         postArray = [];
    //     }
    //     this.setState({mappedPosts: postArray});
    // }

    userLoggedIn = (data, signedIn) => {
        console.log("Got It!");
         console.log(data.username + " & " + " & " + signedIn);
        this.setState({
            userLogInfo: {
                username: data.username,
                image: data.image,
                signedIn: signedIn,
            }
        });
    };
    userLogOut = () => {
        this.setState({
            userLogInfo: {
                username: null,
                // image: null,
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
        console.log(this.state.userLogInfo.signedIn + "work ");
        console.log(this.state.posts);
        let postList = [];
        if (this.state.posts[0]){
            postList = this.state.posts[0].post.map(
                (post) => {
                    return (
                        <div>
                            {/*<p>{post}</p>*/}
                            <p>{this.state.posts[0].username}</p>
                            <p>{post}</p>
                            <hr/>
                        </div>
                    )
                }
            );
    }
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