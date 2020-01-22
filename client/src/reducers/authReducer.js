import {FETCH_USER} from '../actions/types'
//these are all the reducers(reducers handle state change and return a state according to each action)
export default function (state=null,action){
    console.log(action);
    switch(action.type){
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}