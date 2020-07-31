import * as ActionTypes from './actionTypes';
import TRENDING from '../shared/trending';
export const trending = (state = {
   isLoading: true,
   trending: []
},
    action)=>{
   switch(action.type){
      case ActionTypes.ISLOADING_TRENDING:
         return {
            ...state, isLoading: true, trending: []
         }
      case ActionTypes.TRENDING_ANIME:
         return {
            ...state, isLoading: false, trending: action.trending
         }
      default:
         return state;
   }
};