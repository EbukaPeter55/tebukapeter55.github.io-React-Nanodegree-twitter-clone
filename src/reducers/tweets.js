import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

export default function tweets ( state = {}, action ) {
    switch (action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_TWEET:
            return {
                ...state,
                [action.id]:{
                    ...state[action.id],
                    // Filter out the specific authenticated user if they have liked the tweet
                    // else, add it to the likes array
                    likes: action.hasLiked === true
                    ?
                    state[action.id].likes.filter((uid) => uid !== action.authedUser)
                    : state[action.id].likes.concat([action.authedUser])
                }
            }
        case ADD_TWEET: 
            const { tweet } = action
            
            let replyingTo = {};
            // If the replying to property is available, spread the current state
            // and add the new tweet id to the replies array to update it
            if(tweet.replyingTo !== null) {
                replyingTo = {
                    [tweet.replyingTo]: {
                    ...state[tweet.replyingTo],
                    replies: state[tweet.replyTo].replies.concat([tweet.id])
                    }
                }
            }
            return {
                ...state,
                // Add the new tweet to the array of tweets
                [action.tweet.id]: action.tweet,
                ...replyingTo
            }
        default:
            return state;
    }
}