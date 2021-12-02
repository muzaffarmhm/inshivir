const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const {campgroundSchema} = require('../schemas.js')
const AsyncErrorHandler = require('../utils/AsyncError')
const ExpressError = require('../utils/ExpressError')

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


router.get('/new',(req,res)=>{
    res.render('./campgrounds/new')
})

router.post('/campgrounds',validateCampground, AsyncErrorHandler (async(req,res,next)=>{
  
    const campgrounds = new Campground(req.body)
    await campgrounds.save()
    res.redirect('/camps')
}))
    
router.get('/camps',AsyncErrorHandler( async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index', {campgrounds})
}))

router.get('/camps/:id',AsyncErrorHandler (async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id).populate('reviews')
    res.render('./campgrounds/show',{campground})
}))

router.get('/camps/edit/:id',AsyncErrorHandler( async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    res.render('./campgrounds/edit',{campground})
}))


router.put('/camps/update/:id',validateCampground,AsyncErrorHandler(async(req,res)=>{
    const{id} = req.params;
    await Campground.findByIdAndUpdate(id,req.body,{runValidators:true})
    res.redirect(`/camps/${id}`)
}))

router.delete('/camps/delete/:id',AsyncErrorHandler(async(req,res)=>{
    const{id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/camps')
}))

module.exports = router;