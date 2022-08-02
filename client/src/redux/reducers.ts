import { combineReducers } from 'redux';
import globalReducer from '@/redux/slices/globalSlice';
import authReducer from '@/redux/slices/authSlice';
import postReducer from '@/redux/slices/postSlice';
import userReducer from '@/redux/slices/userSlice';

export default combineReducers({
    global: globalReducer,
    auth: authReducer,
    post: postReducer,
    user: userReducer,
});
