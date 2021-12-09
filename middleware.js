const Campground = require("./models/campground");
const User = require("./models/user");
const Review = require("./models/review");
const {campgroundSchema, reviewSchema} = require('./schemas');
const ExpressError = require('./utils/ExpressError');

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectURL = req.url;
        req.flash('error', 'You must be signed in!')
        return res.redirect('/login')
    }
        next();
}

module.exports.isAuthor = async (req,res,next)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id);
    if(!campground.author.equals(req.user._id)){
        req.flash('error', 'You are not the author of this campground')
        return res.redirect(`/camps/${id}`)
    }else{
        next();
    }
}

module.exports.validateCampground = (req, res, next) => {

    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(d => d.message).join(', ')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
