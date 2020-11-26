const request = require('request')

const getWeather = (weather, coordinates, callback) => {
    
    //console.log(`Coordinates getWeather received: ${coordinates}`)
    const weatherURL = weather.baseURL + weather.resource + '?access_key=' + weather.key + '&query=' + coordinates.toString();

    request({url : weatherURL, json : true}, (error, response, body) => {
        //Low level error handling, errors from the 'request' npm module
        if(error) callback('Unable to perform request to the weather API', undefined)
        //Error handling for the errors in the API's response (The call was made with 
        //incomplete requiered parameters, for example)
        else if(body.error) callback(`The request to the the weather API has resulted in an error: ${body.error.info}`, body)
        //The request was made and we got the information as expected
        else 
            callback(undefined, body)
    })
}

const weather = {
    baseURL : 'http://api.weatherstack.com/',
    resource : 'current',
    key : '06eae003dc62d993142f24c547a2b481'
}


const weatherModule = {
    weather : weather,
    getWeather : getWeather
}

module.exports = weatherModule