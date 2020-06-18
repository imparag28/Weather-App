const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { query } = require('express')
const geoWther = require('./util/geo')
const geoget = require('./util/weth')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paraghe'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Parag'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Parag'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.add) {
        return res.send({
            error: 'Please Provide search' //here is prrogrma exicution is stop so we use to 
        })
    }
    geoWther(req.query.add, (error, {latitude,longitude,location}={}) => {

        if (error) {
            return res.send({error})
        } else {
            geoget(latitude,longitude, (error,{des,temp,icon}={}) => {
                if (error) {
                    return res.send({error})
                }
               res.send({
                   forecast: des,
                   temprature : temp,
                   location,
                   icon
                   

               })
            })
        }
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please Provide search'//here is prrogrma exicution is stop so we use to 
        })

    }
    console.log(req.query)
    res.send({
        product: [],

    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'parag',
        errorMassage: 'Page Not Found'
    })
})



app.listen(port, () => {
    console.log('Server is up on port 3000.')

})//