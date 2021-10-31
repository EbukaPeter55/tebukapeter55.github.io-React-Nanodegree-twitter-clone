import React, {Component} from 'react';
import { connect } from 'react-redux';
import { formatTweet } from '../utils/helpers'


class Tweet  extends Component {


    render() {
        const { tweet } = this.props;
        if(tweet === null) {
            return <p>This Tweet doesn't exist</p>
        }

        console.log(this.props);
        return (
            <div className="tweet">
                
            </div>
        )
    }
}

{/*The data(state) this Component needs are: authedUser,
users and tweets, so it destructures them as one of
the parameters, while the other is the id from the parent*/}
function mapStateToProps ({authedUser, users, tweets}, {id}){
const tweet = tweets[id];
// To get the parent tweet inorder to differentiate it from a replying tweet, 
// we need to reference replying to property
const parentTweet = tweet ? tweets[tweet.replyingTo] : null;


return {
    authedUser,
    tweet: tweet
    ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
    : null
}
}

export default connect(mapStateToProps)(Tweet);