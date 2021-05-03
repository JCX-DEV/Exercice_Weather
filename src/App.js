import './App.css';
import AppLogo from './assets/logo.png';
import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { lang } from './config/lang';
import { systemUnits, getDefaultUnitFromCountry } from './config/units';
import { getWeatherFromAPI, getIconsFromAPI, getLocationFromAPI } from './api/owm-scripts';
import { getPositionFromIP } from './api/ip-scripts';
import { getMapURL } from './api/osm-scripts';
import { setLocationWeather } from './store/actions';
import { APP_NAME, COUNTRIES, CITIES, getCountries } from './config/constants';
import Login from './components/login';
import CircularProgress from '@material-ui/core/CircularProgress';
import DropDownMenu from './components/dropDownMenu';
import Toggle from './components/toggle';
import WeatherCard from './components/weatherCard';
import WeatherCurrent from './components/weatherCurrent';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { THEME } from './config/theme';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: THEME.primaryColor,
    },
    secondary: {
      main: THEME.secondaryColor,
    },
    text: {
      primary: THEME.textColor,
    }
  },
});

const getSampleApiKey = (len) => {
  let sample = '';
  for (let i = 0; i < len; i++){
    sample += Math.floor(Math.random()*16).toString(16);
  }
  return sample;
}

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [locale, setLocale] = useState(lang.current());
  const [units, setUnits] = useState(getDefaultUnitFromCountry(lang.current()));
  const [position, setPosition] = useState(null);   // auto GPS position
  const [location, setLocation] = useState(null);   // manual set GPS location
  const [modeAuto, setModeAuto] = useState(true);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);

  const dispatch = useDispatch();

  const weather = useSelector(state => state.weather, shallowEqual);
  const forecast = useSelector(state => state.forecast, shallowEqual);
  const icons = useSelector(state => state.icons, shallowEqual);

  // API call & dispatch to store

  let updateWeather = async (lat, lon) => {
    if (apiKey && lat && lon){
      let displayedIcons = [];    
      await getWeatherFromAPI(apiKey, lat, lon, locale, (units !== "" ? units : null)).then(
        async response => {
          
          let responseIcons = response.current.weather.map(item => item.icon)
            .concat(
              response.daily.map(day => (day.weather.map(d => d.icon)))
                .reduce((a, b) => a.concat(b))
            );

          responseIcons.forEach(responseIcon => {
              if (!displayedIcons.includes(responseIcon) &&
                !Object.keys(icons).includes(responseIcon))
                {
                  displayedIcons.push(responseIcon);
                }
          });
          
          if (displayedIcons.length > 0){
            let loadedIcons = await getIconsFromAPI(displayedIcons);
            dispatch(setLocationWeather(response, loadedIcons))
          }
          else{
            dispatch(setLocationWeather(response, null));
          }          
        }
      );
    }
  }

  // hooks

  useEffect(async () => {
    if (!position){
      try{
        let geoloc = await getPositionFromIP();
        setPosition(Object.assign({}, geoloc));
        setLocation(Object.assign({}, geoloc));
      }
      catch(error){
        console.error(error);
      }
    }
  }, []);

  useEffect(async () => {    
    if (location) {
      setLoading(true);
      try{
        await updateWeather(location.lat, location.lon);
        setLoading(false);
      }
      catch(error){
        console.error(error);
        setLoading(false);
      }
    }
  }, [apiKey, location, locale, units]);

  useEffect(async () => {
    if (apiKey && country && city){
      let nextLocation = await getLocationFromAPI(apiKey, country, city);
      setLocation(nextLocation);
    }
  }, [city]);

  // handles

  let handleSubmitKey = (key) => {
    setApiKey(key);
  }

  let handleLocaleChange = (event) => {
    lang.changeLang(event.target.value, () => setLocale(event.target.value));
  }

  let handleUnitsChange = (event) => {
    setUnits(event.target.value);
  }

  let handleCountryChange = (event) => {
    let nextCountry = (event.target.value !== "" ? event.target.value : null);
    setCountry(nextCountry);
    setCity(null)
  }

  let handleCityChange = (event) => {
    let nextCity = (event.target.value !== "" ? event.target.value : null);
    setCity(nextCity);
  }

  let handleModeChange = (event) => {
    let nextMode = event.target.checked;
    setModeAuto(nextMode);
    if (nextMode){
      setCity(null);
      setCountry(null);
      if(position){
        if (location && (location.lat !== position.lat) && (location.lon !== position.lon)){
          setLocation({lat: position.lat, lon: position.lon, name: position.name})
        }
      }
    }
  }

  return (
    <ThemeProvider theme={theme} >
      {apiKey ?    
        <div className="app-weather">
          <div className="app-header">
              <img src={AppLogo} alt={APP_NAME} className="app-header-logo" />              
            <div className="app-header-settings">
              <DropDownMenu 
                id="setting-lang"
                inputLabel={lang.t("language")}
                value={locale}
                onChange={handleLocaleChange}
                menu={lang.supportedLocales().map(supportedLocale => ({...supportedLocale, value: supportedLocale.id}))}
              />
              <DropDownMenu 
                id="setting-unit"
                inputLabel={lang.t("measure_system")}
                value={units}
                onChange={handleUnitsChange}
                menu={systemUnits.map(systemUnit => ({...systemUnit, id: systemUnit.label, label: lang.t(systemUnit.label)}))}
              />      
            </div>
            <div className="app-header-navigation">
              <Toggle 
                checked={modeAuto}
                onChange={handleModeChange}
                label={lang.t("use_detection")}
              />
              {(!modeAuto) && <div className="header-navigation-country">
                <DropDownMenu 
                  id="select-country"
                  inputLabel={lang.t("country")}
                  value={country}
                  onChange={handleCountryChange}
                  menu={getCountries().map(country => ({...country, id: country.value, label: lang.t(country.label)}))}
                />
                {
                  country && <DropDownMenu 
                    id="select-city"
                    inputLabel={lang.t("city")}
                    value={city}
                    onChange={handleCityChange}
                    menu={CITIES[country].map(city => ({
                      id: `${country}-${city}`,
                      value: city,
                      label: city
                    }))}
                  />
                }
              </div>}
            </div>
          </div>
          {loading 
            ? <div className="app-content">
                <CircularProgress size={150} thickness={3} />
              </div>      
            : location && <div className="app-content">
                <div className="app-content-left">
                  <div className="app-content-weather-main">
                    {(weather && weather.id) && 
                      <WeatherCurrent 
                        key={weather.id} 
                        location={location.name} 
                        color={THEME.color}            
                        {...weather}
                      />
                    }
                  </div>
                  <div className="app-content-weather-forecast">
                    {
                      forecast 
                        ? forecast.map(item =>
                            <WeatherCard
                              key={item.id}
                              src={Object.keys(icons).includes(item.icon) ? icons[item.icon] : null}
                              themeColor={THEME.color}
                              themeFont={THEME.fontColor}
                              {...item}
                            />
                          ) 
                        : null
                    }
                  </div>              
                </div>
                <div className="app-content-right">
                  {location && <iframe 
                      id="weather-map"
                      title="map"
                      width="100%"
                      height="100%"
                      src={getMapURL(location.lat, location.lon, 0.05, 0.15)}
                      className="app-map-iframe"
                    >
                    </iframe>
                  }
                </div>            
              </div>
          }
        </div>
        : <Login 
            formTitle={lang.t("title.login")}
            label="API Key"
            placeholder={lang.t("placeholder.key", { ex: getSampleApiKey(32)})} 
            submitCaption={lang.t("caption.submit")}
            onSubmit={handleSubmitKey}
          />
      }
    </ThemeProvider>
  );
}

export default App;
