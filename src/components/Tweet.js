import React, {Component} from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
// import {TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/lib'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets';


class Tweet  extends Component {
    handleLike = (e) => {
        e.preventDefault()
    
        // todo: Handle Like Tweet
        const { dispatch, tweet, authedUser} = this.props;

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
      }

    // This method is triggered once the replyingTo button is clicked
    toParent = (e, id) => {
        e.preventDefault()
        // todo: Redirect to parent Tweet.
      }

    render() {
        const { tweet } = this.props;
        if(tweet === null) {
            return <p>This Tweet doesn't exist</p>
        }

    const {
        name, avatar, timestamp, text, hasLiked, likes, replies, parent
        } = tweet

        return (
            <div className="tweet">
            <img
            src={avatar}
            alt={`Avatar of ${name}`}
            className='avatar'
          />
          <div className="tweet-info">
          <div>
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
        {/*Only display this button if parent is a thing(has the replying to property as positive)*/}
          {parent && (
            <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
              Replying to @{parent.author}
            </button>
          )}
          <p>{text}</p>
          </div>
          <div className="tweet-icons">
          <TiArrowBackOutline className='tweet-icon' />
          <span>{replies !==0 && replies}</span>
          <button className="heart-button" 
          onClick={this.handleLike}>
           { 
               hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon'/>
            }          
          </button>
          <span>{likes !== 0 && likes}</span>
          </div>
          </div>
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