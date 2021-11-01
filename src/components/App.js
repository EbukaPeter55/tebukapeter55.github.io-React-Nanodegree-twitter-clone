import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import NewTweet from './NetTweet';
import TweetPage from './TweetPage';
import Nav from './Nav';




class App extends Component {
 
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <Router>
      <Fragment>
      <LoadingBar/>
          <div className="container">
          <Nav/>
        {/* If authedUser is null, display null, else render 
        the dashboard*/}
        {
          this.props.loading === true
          ? null
          :
          <div>
          <Route path='/' exact component={Dashboard} />
          <Route path='/tweet/:id' component={TweetPage} />
          <Route path='/new' component={NewTweet} />
          </div>
        }
          </div>
          </Fragment>          
       </Router>
    )
  }
}

function mapStateToProps ({authedUser}) {
return {
  loading: authedUser === null
}
}

export default connect(mapStateToProps)(App)