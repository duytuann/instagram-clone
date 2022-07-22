import { combineReducers } from 'redux';
import authReducer from '@/redux/slices/authSlice';

export default combineReducers({
    auth: authReducer,
});
