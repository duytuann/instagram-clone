import { combineReducers } from 'redux';
import authReducer from '@/redux/slices/authSlice';
import postReducer from '@/redux/slices/postSlice';
import userReducer from '@/redux/slices/userSlice';

export default combineReducers({
    auth: authReducer,
    post: postReducer,
    user: userReducer,
});
