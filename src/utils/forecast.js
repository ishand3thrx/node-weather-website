const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=81ffed38eed28a699529419c068cd5b7&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('unable to connect weather service')
        }
        else if (body.error) {

            callback('unable to find location')
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. it is currently ' + body.current.temperature + ' degrees out there ' + 'and the chance of raining is ' + body.current.precip * 100 + '%')
        }
    })
}

module.exports = forecast