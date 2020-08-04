import * as ActionTypes from './actionTypes';

export const watchList = (state= {
    anime:[]
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_TO_LIST:
            return {
                ...state, anime: action.data
            }
        default:
            return state
    }
};