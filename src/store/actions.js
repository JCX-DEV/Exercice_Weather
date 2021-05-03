export const SET_WEATHER = 'SET_WEATHER';
export const SET_FORECAST = 'SET_FORECAST';
export const SET_ICONS = 'SET_ICONS';

export const setWeather = (payload) => ({
    type: SET_WEATHER,
    payload: payload,
})

export const setForecast = (payload) => ({
    type: SET_FORECAST,
    payload: payload,
})

export const setIcons = (payload) => ({
    type: SET_ICONS,
    payload: payload,
})

export const setLocationWeather = (weather, icons) => {
    return dispatch => {
        dispatch(setWeather(weather.current));
        dispatch(setForecast(weather.daily));
        if (icons) {
            dispatch(setIcons(icons));
        }
    }
} 