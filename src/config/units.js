const UNIT_IMPERIAL = "imperial";
const UNIT_METRICS = "metric";

const COUNTRIES_METRIC = ["FR", "ES", "IT", "DE", "JP"];
const COUNTRIES_IMPERIAL = ["GB", "US"];

export const systemUnits = [
    {
        label: "default",
        value: null,
    },
    {
        label: "imperial_system",
        value: UNIT_IMPERIAL,
    },
    {
        label: "metric_system",
        value: UNIT_METRICS,
    }
];

export const getDefaultUnitFromCountry = (countryCode) => {    
    let defaultUnit = null;
    if (COUNTRIES_IMPERIAL.includes(countryCode.toUpperCase())){
        defaultUnit = UNIT_IMPERIAL;
    }
    if (COUNTRIES_METRIC.includes(countryCode.toUpperCase())){
        defaultUnit = UNIT_METRICS;
    }
    return defaultUnit;
}

export const getTemperatureUnit = (unit) => {
    return (
        unit === UNIT_IMPERIAL 
            ? {label: "Fahrenheit", symbol: "F"}
            : (unit === UNIT_METRICS
                ? {label: "Celsius", symbol: "C"}
                : {lable: "Kelvin", symbol: "K"}
            )
    );
}

export const getSpeedUnit = (unit) => {
    return (
        unit === UNIT_IMPERIAL
            ? {label: "miles per hour", symbol: "mph"}
            : {label: "meter per second", symbol: "m/s"}
    );
}

export const getVolumeUnit = (unit) => {
    return "mm";
}