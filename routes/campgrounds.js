const express = require('express');
const router = express.Router();
const AsyncErrorHandler = require('../utils/AsyncError')
const {isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campground = require('../controller/campground');
const multer  = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

router.get('/camps', AsyncErrorHandler(campground.index));

router.get('/new', isLoggedIn, campground.renderCampgroundForm);

router.post('/campgrounds', isLoggedIn, upload.array('image'),validateCampground, AsyncErrorHandler(campground.createCampground));

router.get('/camps/:id', AsyncErrorHandler(campground.show));

router.get('/camps/edit/:id', isLoggedIn, isAuthor, AsyncErrorHandler(campground.renderEditForm));

router.put('/camps/update/:id', isLoggedIn, isAuthor,upload.array('image'),  validateCampground, AsyncErrorHandler(campground.updateCampground));

router.delete('/camps/delete/:id', isLoggedIn, isAuthor, AsyncErrorHandler(campground.deleteCampground));

module.exports = router;