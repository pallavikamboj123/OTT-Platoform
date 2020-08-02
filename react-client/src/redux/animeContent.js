import * as ActionTypes from './actionTypes';

export const animeContent = (state = {
    episodes: [],
    reviews: [],
    streamingLinks: []
}, action) => {
    switch(action.type){
        case ActionTypes.LOAD_EXTRA_DATA:
            return{
                ...state,
                episodes: action.episodes,
                reviews: action.reviews,
                streamingLinks: action.streamingLinks
            }
        default:
            return state;
    }
}