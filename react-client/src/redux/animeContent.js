import * as ActionTypes from './actionTypes';

export const animeContent = (state = {
    episodes: [],
    reviews: [],
    streamingLinks: []
}, action) => {
    switch(action.type){
        case ActionTypes.LOAD_REVIEWS:
            return{
                ...state,
               reviews: action.reviews
            }

        case ActionTypes.LOAD_EPISODES:
            return{
                ...state,
                episodes: action.episodes
            }
        case ActionTypes.LOAD_STREAMINGlINKS:
            return{
                ...state,
                streamingLinks: action.streamingLinks
            }
        default:
            return state;
    }
}