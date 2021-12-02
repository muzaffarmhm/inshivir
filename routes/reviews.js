const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const Campground = require('../models/campground');
const AsyncErrorHandler = require('../utils/AsyncError')
const ExpressError = require('../utils/ExpressError')
const {reviewSchema} = require('../schemas.js')

//Review Validator
const validateReview = (req, res, next) => {
    const {error} = reviewSchema.validate(req.body);
    if(error){
        const msg = error.details.map(d => d.message).join(', ')
        throw new ExpressError(msg, 400)
    }else{
        next();
    }
}

router.post('/',validateReview, AsyncErrorHandler(async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    campground.reviews.push(review)
    review.save()
    campground.save()
    res.redirect(`/camps/${req.params.id}`)
}))

router.delete('/:review_id',AsyncErrorHandler(async(req,res)=>{
    const {id, review_id} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{ reviews: review_id}})
    await Review.findByIdAndDelete(review_id)
    res.redirect(`/camps/${id}`)
}))

module.exports = router;