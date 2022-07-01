import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const Transform = createTransform(
    (inboundState: any, key) => {
        return inboundState;
    },
    (outBoundState: any, key) => {
        return outBoundState;
    },
);

export const persistConfig = {
    timeout: process.env.NODE_ENV === 'development' ? 0 : 3000,
    key: 'root',
    storage,
    whitelist: ['theme', 'auth'],
    transforms: [Transform],
};
