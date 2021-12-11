const express = require('express');
const router = express.Router();
const AsyncErrorHandler = require('../utils/AsyncError')
const {isLoggedIn, isAuthor, validateCampground } = require('../middleware')
const campground = require('../controller/campground');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/camps', AsyncErrorHandler(campground.index));

router.get('/new', isLoggedIn, campground.renderCampgroundForm);

// router.post('/campgrounds', isLoggedIn, validateCampground, AsyncErrorHandler(campground.createCampground));
router.post('/campgrounds', upload.single('image'),(req,res)=>{
    res.send(req.file)
});


router.get('/camps/:id', AsyncErrorHandler(campground.show));

router.get('/camps/edit/:id', isLoggedIn, isAuthor, AsyncErrorHandler(campground.renderEditForm));

router.put('/camps/update/:id', isLoggedIn, isAuthor, validateCampground, AsyncErrorHandler(campground.updateCampground));

router.delete('/camps/delete/:id', isLoggedIn, isAuthor, AsyncErrorHandler(campground.deleteCampground));

module.exports = router;