import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddTweet } from '../actions/tweets';
import { Redirect } from 'react-router-dom';


class NewTweet extends Component {
    state = {
        text: '',
        toHome: false
    }

    handleChange = (e) => {
        // Grab the value of the textfield, by referencing 
        // the value of the event target
        const text = e.target.value

        this.setState(() => ({
            text
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { text } = this.state
        //todo: Add Tweet to the store
        const { dispatch, id } = this.props;

        // if id is not a thing, it means we are adding a new tweet
        // else we are to update a tweet
        dispatch(handleAddTweet(text, id))

        console.log('New Tweet: ', text);
        this.setState(() => ({
            text: '',
            toHome: id ? false : true
        }))
    }
    render() {
        const {text, toHome} = this.state;

        if (toHome ===  true) {
            return <Redirect to="/"/>
        }
        {/*todo: Redirect to the home view if submitted*/}
        const tweetLeft = 280 - text.length;


        return (
            <div>
            <h3 className='center'>Compose new Tweet</h3>
            <form className="new-tweet" onSubmit={this.handleSubmit}>
            <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          /> 
          {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )}
          <button
            className='btn'
            type='submit'
            disabled={text === ''}>
              Submit
          </button>
            </form>
            </div>
        )
    }
} 


export default connect()(NewTweet);