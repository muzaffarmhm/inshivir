const express = require('express');
const router = express.Router();
const AsyncErrorHandler = require('../utils/AsyncError')
const {isLoggedIn, isAuthor, validateCampground } = require('../middleware')

const Campground = require('../models/campground');

//Joi validator


router.get('/new', isLoggedIn,(req, res) => {
    res.render('./campgrounds/new')
})

router.post('/campgrounds', isLoggedIn, validateCampground, AsyncErrorHandler(async (req, res, next) => {
    const campgrounds = new Campground(req.body)
    campgrounds.author = req.user._id
    await campgrounds.save()
    req.flash('success', 'Campground created successfully')
    res.redirect('/camps')
}))

router.get('/camps', AsyncErrorHandler(async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index', { campgrounds})
}))

router.get('/camps/:id', AsyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate('reviews').populate('author')
    if(!campground){
        req.flash('error', 'Campground not found')
        return res.redirect('/camps')
    }
    res.render('./campgrounds/show', { campground })
}))

router.get('/camps/edit/:id', isLoggedIn, isAuthor, AsyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id) 
    if(!campground){
        req.flash('error', 'Campground not found')
        return res.redirect('/camps')
    }
    
    res.render('./campgrounds/edit', { campground })
}))


router.put('/camps/update/:id', isLoggedIn, isAuthor, validateCampground, AsyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const c = await Campground.findByIdAndUpdate(id, req.body, { runValidators: true })
    req.flash('success', 'Campground updated successfully')
    res.redirect(`/camps/${id}`)
}))

router.delete('/camps/delete/:id', isLoggedIn, isAuthor, AsyncErrorHandler(async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground deleted successfully')
    res.redirect('/camps')
}))

module.exports = router;