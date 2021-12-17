const mongoose =require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')
const User = require('./user')

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
})

const CampgroundSchema = new Schema({
    title: String,
    location: String,
    price: Number, 
    image: [ImageSchema],
    description: String,
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

CampgroundSchema.post('findOneAndDelete', async function(campground){
    if(campground){
        await Review.deleteMany({_id: {$in: campground.reviews}})
    }
})


const Campground = mongoose.model('Campground',CampgroundSchema)

module.exports = Campground