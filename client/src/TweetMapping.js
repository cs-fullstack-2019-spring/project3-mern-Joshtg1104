import React, {Component} from 'react';

import './App.css';

class TweetMapping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postData: [],
        }
    }

    componentDidMount() {
        this.postMapdata();
    }

    postMapdata = () => {
        fetch('/postList')
        // .then(data=>data.text())
        // .then(data=>console.log(data));
            .then(postData => postData.json())
            .then(listingData => this.setState({postData: listingData}))
    };


    render() {
        let postList = this.state.postData.map(
            (post) => {
                return (
                    <div>
                        <p>{post.username}</p>
                        <p>{post.post}</p>
                        <hr/>
                    </div>
                )
            }
        );
        return (
            <div>
                {postList}
            </div>
        );
    }
}

export default TweetMapping;