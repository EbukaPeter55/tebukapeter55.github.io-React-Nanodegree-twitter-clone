import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NetTweet';
import TweetPage from './TweetPage';



class App extends Component {
 
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <div>
      <LoadingBar/>
     {/* If authedUser is null, display null, else render 
    the dashboard*/}
     {
       this.props.loading === true
      ? null
      :
      <TweetPage match={{params: {id: '8xf0y6ziyjabvozdd253nd'}}}/>
     }
      </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
return {
  loading: authedUser === null
}
}

export default connect(mapStateToProps)(App)