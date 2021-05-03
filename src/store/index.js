import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialData from './initialData';
import { weatherReducer, forecastReducer, iconsReducer } from './reducers';

const reducers = combineReducers({
    weather: weatherReducer,
    forecast: forecastReducer,
    icons: iconsReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export default createStore(
    (state, action) => reducers(state, action),
    initialData,
    composedEnhancer
);