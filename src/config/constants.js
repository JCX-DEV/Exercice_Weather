export const APP_NAME = "Weather";

export const COUNTRIES = {
    "FR": "France",
    "ES": "Spain",
    "DE": "Germany",
    "IT": "Italy",
    "US": "United_States",
    "CA": "Canada",
    "CN": "China",
    "KR": "Korea",
    "JP": "Japan"
} 

export const getCountries = () => {
    return Object.keys(COUNTRIES).map(key => ({label: COUNTRIES[key], value: key}));
}

export const CITIES = {
    "FR": ["Paris", "Lyon", "Lille", "Bordeaux", "Marseille"],
    "ES": ["Madrid", "Barcelona", "Sevilla"],
    "DE": ["Berlin", "Hambourg", "Munich"],
    "IT": ["Rome", "Florence", "Venice", "Milan"],
    "US": ["Washington DC", "New York City", "Dallas", "Chicago", "Seattle", "San Francisco", "Los Angeles"],
    "CA": ["Toronto", "Montréal", "Ottawa"],
    "CN": ["Beijing", "Shanghai", "Canton"],
    "KR": ["Seoul", "Incheon"],
    "JP": ["Tokyo", "Osaka", "Sapporo"]
}