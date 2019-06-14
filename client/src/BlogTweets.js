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

    componentDidMount() {
        this.displayPosts();
    }

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
                image: e.target.image.value,
            }),
        })
            .then(data=>data.text())
            .then(response=>this.setState({message: response}));
    };


    displayPosts = () => {
        fetch('/users/userList')
            .then(posts => posts.json())
            .then(postData => this.setState({userposts: postData}))
    };


    render() {
        if(!this.props.userLogInfo.signedIn===true){
            return(
                //returns this message
                <div>
                    <h1>SQUUAAAAAAWK!! LOG IN FIRST!</h1>
                </div>
            );
        }
        else{
            if (this.state.userposts) {
                let userList = this.state.userposts.map((user) => {
                        return user.post.map((tweet) => {
                                return (
                                    <div>
                                        <p><strong>{user.username}</strong></p>
                                        <img src={user.image} alt="photo"/>
                                        <p>{tweet}</p>
                                        <hr/>
                                    </div>
                                )
                            }
                        )
                    }
                );
                return(
                    //return form to post tweets
                    <div>

                        {/*<h1>Welcome {this.props.userLogInfo.username}</h1>*/}
                        <form onSubmit={this.submitTweet}>
                            <p>
                                <label htmlFor={"post"}>Add Post</label>
                                <input id={"post"} type={"text"} name={"post"} placeholder={"Add Post..."} autoFocus/>
                            </p>
                            <p>
                                <label htmlFor={"image"}>Image URL: </label>
                                <input id={"image"} type="text" name="image" placeholder="Image URL Here..."/>
                            </p>
                            <button>SQUAWK</button>
                        </form>
                        {this.state.message}
                        {userList}
                    </div>
                );
            }
            else{
                return (
                    <div>
                        <h3>No Posts</h3>
                    </div>
                )
            }
            // return(
            //     //return form to post tweets
            //     <div>
            //
            //         {/*<h1>Welcome {this.props.userLogInfo.username}</h1>*/}
            //         <form onSubmit={this.submitTweet}>
            //             <p>
            //                 <label htmlFor={"post"}>Add Post</label>
            //                 <input id={"post"} type={"text"} name={"post"} placeholder={"Add Post..."} autoFocus/>
            //             </p>
            //             <p>
            //                 <label htmlFor={"image"}>Image URL: </label>
            //                 <input id={"image"} type="text" name="image" placeholder="Image URL Here..."/>
            //             </p>
            //             <button>SQUAWK</button>
            //         </form>
            //         {this.state.message}
            //
            //     </div>
            // );
        }
        // return (
        //     <div className="App">
        //         <h1>Blog Posts Here</h1>
        //         <h3>Are you Signed In?</h3>
        //     </div>
        // );
    }
}

export default BlogTweets;