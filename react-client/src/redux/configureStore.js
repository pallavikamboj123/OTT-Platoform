import {createStore, combineReducers, applyMiddleware} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { trending } from './trending';
import {Auth } from './auth';
import {anime} from './anime';
import {animeContent} from './animeContent';
import {watchList} from './watchlist';


export const ConfigureStore = ()=>{
    const store = createStore(

        combineReducers({
            // add all reducer functions
            trending: trending,
            auth: Auth,
            anime: anime,
            animeContent: animeContent,
            watchList: watchList
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}
