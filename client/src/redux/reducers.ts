import { combineReducers } from 'redux';
import authReducer from '@/redux/slices/authSlice';
import postReducer from '@/redux/slices/postSlice';

export default combineReducers({
    auth: authReducer,
    post: postReducer,
});
