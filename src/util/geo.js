const requset = require('request')
const geoWther = (add, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(add) + '.json?access_token=pk.eyJ1IjoiYXhwYTIxMjgiLCJhIjoiY2tiZjZxbWR3MDk1NTJ4a2N2eGo4YThhYiJ9.Fvu0IR_co_fs6SrVusGToQ&limit=1'
    requset({ url, json: true }, (error, res) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (res.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else {
            callback(
                undefined, {
                latitude: res.body.features[0].center[1],
                longitude: res.body.features[0].center[0],
                location: res.body.features[0].place_name
            })
        }


    })
}
module.exports = geoWther