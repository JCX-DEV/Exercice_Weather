import moment from 'moment';
import { lang } from '../config/lang';
import { getTemperatureUnit, getSpeedUnit, getVolumeUnit } from '../config/units';
import { COUNTRIES } from '../config/constants';

const URL_ICON = "https://openweathermap.org/img/wn/";
const URL_ONE_CALL = "https://api.openweathermap.org/data/2.5/";
const URL_GEOCODING = "http://api.openweathermap.org/geo/1.0/";

const CALL_ONECALL = "onecall?";
const CALL_DIRECT = "direct?";

const PARAM_LAT = "lat";
const PARAM_LON = "lon";
const PARAM_APPID = "appid";
const PARAM_EXCLUDE = "exclude";
const PARAM_UNITS = "units";
const PARAM_LANG = "lang";
const PARAM_Q = "q";

let getApiUrl = (url, call, params) => (`${url}${call ? call : ''}${params.join('&')}`);
let getIconUrl = (icon) => (`${URL_ICON}${icon}@2x.png`);

let checkKey = (apiKey, defaultResult) => {
  if (!apiKey){
    console.error('Open Weather Map API KEY is not defined');
    return defaultResult;
  }
}

export const getIconsFromAPI = async (iconsToLoad) => {
  let updatedIcons = {};
  for (let i = 0; i < iconsToLoad.length; i++){
    let blobPng = await fetch(getIconUrl(iconsToLoad[i])).then(
      response => response.blob()
    );
    updatedIcons[iconsToLoad[i]] = URL.createObjectURL(blobPng)
  }
  return updatedIcons;
}

export const getWeatherFromAPI = async (apiKey, lat, lon, lang, units = null) => {
    
    checkKey(apiKey, {current: null, daily: []});

    let params = [
        `${PARAM_LAT}=${lat}`,
        `${PARAM_LON}=${lon}`,
        `${PARAM_EXCLUDE}=minutely,hourly`,
        `${PARAM_APPID}=${apiKey}`,
        `${PARAM_LANG}=${lang}`
    ];
    if (units){
        params.push(`${PARAM_UNITS}=${units}`);
    }
    const url = getApiUrl(URL_ONE_CALL, CALL_ONECALL, params);

    let response = await fetch(url).then(response => response.json());

    let deg = getTemperatureUnit(units).symbol;
    let speed = getSpeedUnit(units).symbol;
    let volume = getVolumeUnit(units);
    let gps = `${response.lat}-${response.lon}`;

    let formatedResponse = {
      current: {
        id: `${gps}-${response.current.dt}`,
        weather: response.current.weather,
        dt: response.current.dt,
        date: moment.utc(response.current.dt*1000).format("LL"),
        main: response.current.weather.length ? response.current.weather[0].main : null,
        description: response.current.weather.length ? response.current.weather[0].description : null,
        icon: response.current.weather.length ? response.current.weather[0].icon : null,
        category: response.current.weather.length ? Math.floor((response.current.weather[0].id > 800 ? 900 : response.current.weather[0].id)/100) : null,
        temp: response.current.temp ? `${response.current.temp}°${deg}` : null,
        humidity: response.current.humidity ? `${Math.round(response.current.humidity)}%` : null,
        clouds : response.current.clouds ? `${Math.round(response.current.clouds)}%` : null,
        wind: response.current.wind_speed ? `${response.current.wind_speed}${speed}` : null,
        rain: response.current.rain ? `${response.current.rain["1h"]}${volume}` : null,
        snow: response.current.snow ? `${response.current.snow["1h"]}${volume}` : null,
      },
      daily: response.daily.map(
        day => ({
          id: `${gps}-${day.dt}`,
          weather: day.weather,
          dt: day.dt,
          date: moment.utc(day.dt*1000).format("LL"),
          main: day.weather.length ? day.weather[0].main : null,
          description: day.weather.length ? day.weather[0].description : null,
          icon: day.weather.length ? day.weather[0].icon : null,
          temp: day.temp ? `${day.temp.min}°${deg} | ${day.temp.max}°${deg}` : null,
          humidity: day.humidity ? `${Math.round(day.humidity)}%` : null,
          clouds: day.clouds ? `${Math.round(day.clouds)}%` : null,
          wind: day.wind_speed ? `${day.wind_speed}${speed}` : null,
          rain: day.rain ? `${day.rain}${volume}` : null,
          snow: day.snow ? `${day.snow}${volume}` : null,
          pop: day.pop ? `${Math.round(day.pop)*100}%` : '0%'
        })
      )
    }
    
    return formatedResponse;
}

export const getLocationFromAPI = async (apiKey, country, city) => {

  checkKey(apiKey, null);
  
  let params = [
    `${PARAM_Q}=${city},${country}`,
    `${PARAM_APPID}=${apiKey}`
  ];

  const url = getApiUrl(URL_GEOCODING, CALL_DIRECT, params);
  let response = await fetch(url).then(response => response.json());

  if (response.length <= 0) {
    console.error('Open Weather Map failed to find position of: ', city, country)
  }
  
  return (
    response.length ?
      {
        lat: response[0][PARAM_LAT],
        lon: response[0][PARAM_LON],
        name: `${city}, ${lang.t(COUNTRIES[country])}`
      }
      : null
  )
}