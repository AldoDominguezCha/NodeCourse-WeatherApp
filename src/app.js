//Core node.js modules
const path = require('path')
//npm modules
const express = require('express')
const hbs = require('hbs')
//our modules
const geocodeModule = require('./modules/geocode')
const weatherModule = require('./modules/weather')

const name = 'Aldo Domínguez'

const app = express()
const port = process.env.PORT || 3000

//Defining paths for Express config
const publicsPath = path.join(__dirname, '..', 'public')
const templatesPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Set up hbs node module with Express, to use handlebars template engine for
//the HTML documents we are serving with Express
app.set('view engine', 'hbs')
//I had to add this line for 'res.render' to work, I'm specifying exactly where
// the folder containing the views, where Express is supposed to take the template from, is located
app.set('views', templatesPath)
//Set up the static directory to serve
app.use(express.static(publicsPath))
//Set up the directory for hbs to find the partials
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App Index',
        name
    })

})

app.get('/about', (req, res)=> {
    res.render('about', {
        title : 'About page',
        name
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title : 'Help page',
        message : 'This is just a practice Node.js web app. You are in the dummy help page.',
        name
    })
})

app.get('/weather', (req, res) => {
    console.log(req)
    if(!req.query.address)
        return res.send({ error : "You must provide an address!" })
        
    geocodeModule.getGeocode(geocodeModule.geocode, req.query.address, (error, {coordinates, placeName} = {}) => {
        if(error) return res.send({ error })
        else{
            weatherModule.getWeather(weatherModule.weather, coordinates, (error, {current} = {}) => {
                if(error) return res.send({error})
                res.send({
                    searchedPlace : req.query.address,
                    locationFound : placeName,
                    coordinates,
                    forecast : `${current.weather_descriptions}. It's ${current.temperature} degrees celsisus and it feels like ${current.feelslike}.`
                })
            })
        }
    }) 
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        name,
        errorMessage : "Oops! Looks like this help article doesn't exist :("
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        name,
        errorMessage : "Oops! Looks like this page doesn't exist :("
    })
})


//Start the server (server listening to requests) on port 3000 (localhost:3000)
app.listen(port, () => {
    console.log(`Server is up in port ${port}.`)
})