const express = require('express');
const router = express.Router({mergeParams: true});
const Review = require('../models/review');
const Campground = require('../models/campground');
const AsyncErrorHandler = require('../utils/AsyncError')
const {validateReview,isReviewAuthor, isLoggedIn} = require('../middleware')
const review = require('../controller/review');

router.post('/',isLoggedIn, validateReview, AsyncErrorHandler(review.createReview));

router.delete('/:reviewId',isLoggedIn, isReviewAuthor, AsyncErrorHandler(review.deleteReview));

module.exports = router;