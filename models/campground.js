const mongoose =require('mongoose')
const Schema = mongoose.Schema

const CampgroundSchema = new Schema({
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
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
});

const Campground = mongoose.model('Campground',CampgroundSchema)

module.exports = Campground