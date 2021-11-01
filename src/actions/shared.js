import { getInitialData } from '../utils/api';
import { receiveUsers } from './users';
import { receiveTweets } from './tweets';
import { setAuthedUser } from './authedUser';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = 'tylermcginnis'

// action creator Using redux thunk middleware
export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading()) //Dispatches the loading bar once we load the component
        return getInitialData()
        .then(({users, tweets}) => {
            dispatch(receiveUsers(users));
            dispatch(receiveTweets(tweets));
            dispatch(setAuthedUser(AUTHED_ID));
            dispatch(hideLoading());
        })
    }
}