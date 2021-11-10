const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('../models/campground')
const data = require('./seeds')

mongoose.connect('mongodb://localhost:27017/in-shivir')
.then(console.log('MongoDB connected succesfully..'))


//seed data

const seedDB = async() =>{
    try{
        await Campground.deleteMany({})
        console.log('removed campgrounds')
        await Campground.insertMany(data)
        console.log('seeded campgrounds')
    }catch(err){
        console.log(err)
    }
} 

seedDB();