import React, {Component} from 'react';

import './App.css';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            image: "",
            posts: null,
        };
    }

    //mounts displayPosts function
    componentDidMount() {
        this.displayPosts();
    }

    //event handler that that fetches user/login route to allow user to login
    submitLogin = (e) => {
        e.preventDefault();
        console.log("Loggingg In... Logged In");
        fetch('/users/login',
            {
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value,
                    // image: e.target.image.value
                }),
            })
            .then(data => data.json())
            .then(data => {
                console.log("Here is data");
                console.log(data);
                if (data)
                    return this.props.userLoggedIn(data, true);
                else
                    return this.props.userLoggedIn(data, false)
            });
    };
    //fetches postlist from user route which displays all post made on site
    displayPosts = () => {
        fetch('/users/postList')
            .then(posts => posts.json())
            .then(postData => this.setState({posts: postData}))
    };

    render() {
        console.log(this.props.userLogInfo.signedIn + "work ");
        console.log(this.state.posts);
        //maps all post from user with index 0

        let postList = [];
        let user = [];
        if (this.state.posts) {
            console.log("user");
            console.log(this.state.posts);
            postList = this.state.posts.map((user) => {
                    // console.log("posts");
                    // console.log(posts);
                    return user.post.map((tweet) => {
                            // console.log("tweet");
                            // console.log(tweet);
                            return (
                                <div>
                                    <p><strong>{user.username}</strong></p>
                                    <p>{tweet}</p>
                                    <hr/>
                                </div>
                            )
                        }
                    )
                }
            );
        }

        if (this.props.userLogInfo.signedIn) {
            console.log(this.props + "A");
            return (
                <div>
                    {/*<img src="LeeMan" alt="" */}
                    {/*{this.props.userLogInfo.image}*/}
                    <img src={this.props.userLogInfo.image} alt=""/>
                    <h1>Hello {this.props.userLogInfo.username}</h1>
                    {postList}
                </div>
            );
        } else {
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
                    {postList}
                </div>
            );
        }

    }
}

export default SignIn;