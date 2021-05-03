const URL_IP_WHOIS = "http://ipwhois.app/json/";

const PARAM_SUCCESS = "success";
const PARAM_MESSAGE = "message";
const PARAM_LATITUDE = "latitude";
const PARAM_LONGITUDE = "longitude";
const PARAM_COUNTRY = "country";
const PARAM_CITY = "city";

export const getPositionFromIP = async () => {
    try{
        const url = URL_IP_WHOIS;
        let response = await fetch(url).then(response => response.json());
        
        if (response[PARAM_SUCCESS]){
            return ({
                lat: response[PARAM_LATITUDE],
                lon: response[PARAM_LONGITUDE],
                name: `${response[PARAM_CITY]}, ${response[PARAM_COUNTRY]}`
            })
        }
        else{
            console.error('IPWhois API Call failed:', response[PARAM_MESSAGE]);
            console.error("Fallback to the most beautiful city in the wolrd.");
            return ({
                lat: 48.85,
                lon: 2.35,
                name: "Paris, France"
            })
        }
    }
    catch(error){
        console.log('IPWhois API Call: error occured', error);
        return ({lat: 48.85, lon: 2.35, name: "Paris, France"});
    }
}