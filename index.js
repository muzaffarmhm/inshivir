const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const Joi = require('joi')
const Campground = require('./models/campground')
const Review = require('./models/review')
const AsyncErrorHandler = require('./utils/AsyncError')
const ExpressError = require('./utils/ExpressError')
const {campgroundSchema, reviewSchema} = require('./schemas.js')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//Joi validator
const validateCampground = (req, res, next) => {
    
    const {error} = campgroundSchema.validate(req.body);
    if(error){
        const msg = error.details.map(d => d.message).join(', ')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(d => d.message).join(', ')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}


mongoose.connect('mongodb://localhost:27017/in-shivir')
.then(console.log('MongoDB connected succesfully..'))



app.listen(3000,()=>{
    console.log("App Listening at 3000...")
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('./campgrounds/new')
})

app.post('/campgrounds',validateCampground, AsyncErrorHandler (async(req,res,next)=>{
  
    const campgrounds = new Campground(req.body)
    await campgrounds.save()
    res.redirect('/camps')
}))
    


app.get('/camps',AsyncErrorHandler( async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index', {campgrounds})
}))

app.get('/camps/:id',AsyncErrorHandler (async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    res.render('./campgrounds/show',{campground})
}))

app.post('/camps/:id/review',validateReview, AsyncErrorHandler(async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    review.save()
    campground.save()
    res.redirect(`/camps/${req.params.id}`)
}))

app.get('/camps/edit/:id',AsyncErrorHandler( async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    res.render('./campgrounds/edit',{campground})
}))


app.put('/camps/update/:id',validateCampground,AsyncErrorHandler(async(req,res)=>{
    const{id} = req.params;
    await Campground.findByIdAndUpdate(id,req.body,{runValidators:true})
    res.redirect(`/camps/${id}`)
}))

app.delete('/camps/delete/:id',AsyncErrorHandler(async(req,res)=>{
    const{id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/camps')
}))


app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404))
    })

app.use((err,req,res,next)=>{
    const {statusCode = 500 } = err;
    if(!err.message){
        err.message = 'Something went wrong'
    }
    res.status(statusCode).render('error',{err})
})  