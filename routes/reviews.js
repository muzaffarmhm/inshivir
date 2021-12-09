const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const Campground = require('../models/campground');
const AsyncErrorHandler = require('../utils/AsyncError')
const {validateReview,isReviewAuthor, isLoggedIn} = require('../middleware')


router.post('/',isLoggedIn, validateReview, AsyncErrorHandler(async(req,res)=>{
    const campground = await Campground.findById(req.params.id)
    const review = new Review(req.body)
    review.author= req.user._id
    campground.reviews.push(review)
    review.save()
    campground.save()
    req.flash('success', 'Review added successfully')
    res.redirect(`/camps/${req.params.id}`)
}))

router.delete('/:review_id',isLoggedIn, isReviewAuthor, AsyncErrorHandler(async(req,res)=>{
    const {id, review_id} = req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{ reviews: review_id}})
    await Review.findByIdAndDelete(review_id)
    req.flash('success', 'Review deleted successfully')
    res.redirect(`/camps/${id}`)
}))

module.exports = router;