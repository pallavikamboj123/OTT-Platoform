import * as ActionTypes from './actionTypes';

export const watchList = (state= {
    watchList:[],
    isLoading: true
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_TO_LIST:
            return {
                ...state, watchList: action.data, isLoading: false
            }
        case ActionTypes.LOADING_FETCH_WATCHLIST:
            return{
                ...state, isLoading: true
            }
        default:
            return state
    }
};