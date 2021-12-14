const mongoose =require('mongoose')
const Schema = mongoose.Schema
const Review = require('./review')
const User = require('./user')

const CampgroundSchema = new Schema({
    title: String,
    location: String,
    price: Number, 
    image: [
        {
            url: String,
            filename: String
        }
    ],
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