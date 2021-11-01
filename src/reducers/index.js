import { combineReducers } from 'redux';
import authedUser from './authedUser';
import users from './users';
import tweets from './tweets';
import { loadingBarReducer } from 'react-redux-loading'



export default combineReducers ({
    authedUser,
    users,
    tweets,
    loadingBar: loadingBarReducer //Add loading bar as part of the state in our redux store
})