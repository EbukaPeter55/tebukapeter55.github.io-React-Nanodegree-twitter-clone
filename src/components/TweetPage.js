import React, {  Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';
import NetTweet from './NetTweet';



class TweetPage extends Component {


    render() {
        const { id, replies } = this.props
        return (
            <div>
               <Tweet id={id}/>
               {/*We pass an Id meaning we are replying 
            to the tweet, and thats the tweet id*/}
                <NetTweet id={id}/>
                {replies.length !== 0 && <h3 className='center'>Replies</h3>}
                <ul>
                {replies.map((replyId) => (
                  <li key={replyId}>
                    <Tweet id={replyId}/>
                  </li>
                ))}
              </ul>
            </div>
        )
    }
}

function mapStateToProps ({ authedUser, tweets, users }, props) {
 const { id } = props.match.params;

 return {
     id,
    //  If no tweet with this id, return an empty Array, else
    //  return the individual tweet replies sorted chronoloically
     replies: !tweets[id]
     ? []
     : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
 }
}

export default connect(mapStateToProps)(TweetPage);