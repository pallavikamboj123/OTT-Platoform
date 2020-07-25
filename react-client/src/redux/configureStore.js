import {createStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { trending } from './actioncreators';


export const ConfigureStore = ()=>{
    const store = createStore(

        combineReducers({
            // add all reducer functions
            trending: trending
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}
