const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const { title } = require('process')
const { error } = require('console')

console.log(__dirname)
console.log(path.join(__dirname,'../public'))

const viewsPath = path.join(__dirname,'../template/view')
const partialsPath = path.join(__dirname,'../template/partials')
const app = express()
const port = process.env.PORT || 3000;

// set handlebars
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Ishan'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you need to provide your location'
        })

    }

    geoCode(req.query.address,(error,{latitude:lat,longitude:long,location:loc}={})=>{
        if(error){
          return res.send({
            error
        })}
        forecast(lat,long,(error,forecastData)=>{
           if(error){
          return res.send({
            error
        })}
        res.send({
            forecast:forecastData,
        location:loc,
        providedAddress: req.query.address
        }) 
        })

    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
    return res.send({
        error:'you must provide a search term'
    })    
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Ishan bajaj'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'WHY DO YOU NEED HELP??',
        name:'Ishan bajaj'
    })
})
app.get('/ping', (req, res) => {
  res.send('Pong!');
});
app.get('/help/*slug', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Ishan',
        errorMessage:'help article not found'
    });
});
app.use((req, res) => {
  res.render('404',{
    title:404,
    name:'Ishan',
    errorMessage:'page not found'
})
});

app.listen(port,()=>{
    console.log('server is up on port '+port)
})