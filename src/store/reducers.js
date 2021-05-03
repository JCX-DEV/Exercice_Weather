import { SET_WEATHER, SET_FORECAST, SET_ICONS } from './actions';

export const weatherReducer = (state = null, action) => {
    switch(action.type){
        case SET_WEATHER: 
            return action.payload;
        default: return state;
    }
}

export const forecastReducer = (state = null, action) => {
    switch(action.type){
        case SET_FORECAST: 
            return action.payload;
        default: return state;
    }
}

export const iconsReducer = (state = null, action) => {
    switch(action.type){
        case SET_ICONS :
            let nextState = Object.assign({}, state, action.payload);   
            return nextState;
        default: return state;
    }
}