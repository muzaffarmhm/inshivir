const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


mongoose.connect('mongodb://localhost:27017/in-shivir')
    .then(console.log('MongoDB connected succesfully..'))

//Routers

app.use('/', campgrounds)  //Campgrounds
app.use('/camps/:id/review', reviews)  //Campgrounds

app.listen(3000, () => {
    console.log("App Listening at 3000...")
})

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) {
        err.message = 'Something went wrong'
    }
    res.status(statusCode).render('error', { err })
})