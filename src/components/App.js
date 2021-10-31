import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';


class App extends Component {
 
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }


  render() {
    return (
      <div>
     {/* If authedUser is null, display null, else render 
    the dashboard*/}
     {
       this.props.loading === true
      ? null
      :
      <Dashboard/>
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