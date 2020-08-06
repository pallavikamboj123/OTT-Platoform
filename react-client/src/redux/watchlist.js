import * as ActionTypes from './actionTypes';

export const watchList = (state= {
    watchList:[]
}, action) =>{
    switch(action.type){
        case ActionTypes.ADD_TO_LIST:
            return {
                ...state, watchList: action.data
            }
        default:
            return state
    }
};