import {createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import rootReducer from "./rootReducer";

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['projects']
}

const pReducer = persistReducer(persistConfig, rootReducer);

export const store= createStore(pReducer,applyMiddleware(reduxThunk, reduxLogger))
export const persistor = persistStore(store);