const URL_MAP = "https://www.openstreetmap.org/export/embed.html?"

const PARAM_VIEWBOX = "bbox";
const PARAM_LAYER = "layer";

export const getMapURL = (lat, lon, totLat, totLon) => {
    let fixedLat = parseFloat(parseFloat(lat).toFixed(4));
    let fixedLon = parseFloat(parseFloat(lon).toFixed(4));
    
    let latMax = fixedLat + 0.5*totLat; 
    let latMin = fixedLat - 0.5*totLat; 
    let lonMax = fixedLon + 0.5*totLon; 
    let lonMin = fixedLon - 0.5*totLon; 

    let bbox = [lonMin, latMax, lonMax, latMin].join('%2C');
    let layer = "mapnik";

    return `${URL_MAP}${PARAM_VIEWBOX}=${bbox}&${PARAM_LAYER}=${layer}`;
}