if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const session = require('express-session')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const ExpressError = require('./utils/ExpressError')
const User = require('./models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')

const userRoutes = require('./routes/user')
const campgroundRoutes= require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

mongoose.connect('mongodb://localhost:27017/in-shivir')
    .then(console.log('MongoDB connected succesfully..'))

    const sessionConfig = {
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expire: new Date(Date.now() + 3600000),
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => { 
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

 //Routers

app.use('/', userRoutes)  //User Routes
app.use('/', campgroundRoutes)  //Campgrounds
app.use('/camps/:id/review', reviewRoutes)  //Reviews


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