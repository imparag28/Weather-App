const requset = require('request')
const geoget = (lat,lang, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fb61bf51d4117922711851d9977fedb9&%20query='+ encodeURIComponent(lat) +', '+  encodeURIComponent(lang) +''
    requset({ url, json: true }, (error, {body}={}) => {//destrucute feture is used 
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to Coonect Wether. Try another search.', undefined)
        }
        else {
            callback(
                undefined, {
                des :body.current.weather_descriptions[0],
                temp: body.current.temperature,
                icon : body.current.weather_icons[0]
                
            })
        }


    })
}

module.exports = geoget
