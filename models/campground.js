const mongoose =require('mongoose')
const Schema = mongoose.Schema

const CampgroundSchema = ({
    title: String,
    location: String,
    price: Number, 
    image: {
        type: String,
        index : {
            dropDups : true
            }
    },
    description: String,
});

const Campground = mongoose.model('Campground',CampgroundSchema)

module.exports = Campground