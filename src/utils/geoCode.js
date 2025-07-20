const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.positionstack.com/v1/forward?access_key=1cfecc270736daf4cdff28b5a3cd0fa0&query=' + encodeURIComponent(address)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to conncet to loaction services')
        }
        else if (body.error) {
            callback('Unable to find location')
        }
        else if (body.data.length === 0) {
            callback('Unbale to search location, search with a new one')
        }
        else {
            callback(undefined, {
                latitude: body.data[0].latitude,
                longitude: body.data[0].longitude,
                location: body.data[0].name
            })
        }
    })
}

module.exports = geoCode