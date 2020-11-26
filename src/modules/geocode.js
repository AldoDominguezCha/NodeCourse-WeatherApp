const request = require('request')


const geocode = {
    baseURL : 'https://api.mapbox.com/',
    resource : 'geocoding/v5/mapbox.places/',
    token : 'pk.eyJ1IjoiYWxkbzAyMTIiLCJhIjoiY2tob3l6ZGpzMDhoODJybDFwdHZ0MWl0YiJ9.07qOSj1tFu0FYUyPtT_k2g',
    limit : 1,
    language : 'en'
}

const getGeocode = (geocode, adress, callback) => {
    
    const geocodeURL = geocode.baseURL + geocode.resource + encodeURIComponent(adress) + '.json?access_token=' + geocode.token + '&limit=' + geocode.limit + '&language=' + geocode.language

    request({url : geocodeURL, json : true}, (error, response, body) => {
        //Low level error handling, errors from the 'request' npm module
        if (error) callback('Unable to perform request to the geocode API', undefined)
        //Error handling for no matching location
        else if (!(Array.isArray(body.features) && body.features.length)) callback('No matches were found by the geocode API for the location provided :(', undefined)
        //The request was made and we got the information as expected
        else {
            latitude = body.features[0].center[1]
            longitude = body.features[0].center[0]
            coordinates = [latitude, longitude]
            location = {
                coordinates : coordinates,
                placeName : body.features[0].place_name
            }
            //Using the callback pattern to handle the asynchronous processing of data 
            //coming from the API (We get the data from the API, then we pass
            //that data to the callback function, which is our parameter function)
            callback(undefined, location)
        }
    })
}

const geocodeModule = {
    geocode : geocode,
    getGeocode : getGeocode
}

module.exports = geocodeModule