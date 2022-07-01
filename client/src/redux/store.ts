import { persistReducer, persistStore } from 'redux-persist';
import { AnyAction, CombinedState, configureStore, Reducer } from '@reduxjs/toolkit';
import sagaMiddleware, { setupMiddleware } from './middleware';
import rootReducer from './reducers';
import { persistConfig } from './options';

const persistedReducer = persistReducer(persistConfig, rootReducer) as Reducer<CombinedState<RootState>, AnyAction>;

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(sagaMiddleware),
});

setupMiddleware();

let persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
