const Campground = require('../models/campground')

module.exports.renderCampgroundForm = (req, res) => {
    res.render('./campgrounds/new')
}

module.exports.index = (async (req, res) => {
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index', { campgrounds})
})

module.exports.createCampground = (async (req, res, next) => {
    const campgrounds = new Campground(req.body)
    campgrounds.author = req.user._id
    await campgrounds.save()
    req.flash('success', 'Campground created successfully')
    res.redirect('/camps')
})

module.exports.show = (async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path: 'reviews', 
        populate:{
            path: 'author',
        }
    }).populate('author')
    if(!campground){
        req.flash('error', 'Campground not found')
        return res.redirect('/camps')
    }
    res.render('./campgrounds/show', { campground })
})

module.exports.renderEditForm = (async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id) 
    if(!campground){
        req.flash('error', 'Campground not found')
        return res.redirect('/camps')
    }
    
    res.render('./campgrounds/edit', { campground })
})

module.exports.updateCampground = (async (req, res) => {
    const { id } = req.params;
    const c = await Campground.findByIdAndUpdate(id, req.body, { runValidators: true })
    req.flash('success', 'Campground updated successfully')
    res.redirect(`/camps/${id}`)
})

module.exports.deleteCampground = (async (req, res) => {
    const { id } = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground deleted successfully')
    res.redirect('/camps')
})