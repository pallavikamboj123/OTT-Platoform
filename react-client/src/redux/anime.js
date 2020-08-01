import * as ActionTypes from './actionTypes';

export const anime = (state={
    isLoading: true,
    anime: [],
    isImport: false
}, action)=>{
    switch(action.type){
        case ActionTypes.ISLOADING_ANIME:
            return{
                ...state, isLoading: true, isImport: true
            }
        case ActionTypes.LOAD_ANIME:
            return {
                ...state, isLoading: false, anime: action.anime, isImport: true
            }
        default:
            return state;
        
    }
}