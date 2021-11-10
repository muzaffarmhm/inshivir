const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campground')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

mongoose.connect('mongodb://localhost:27017/in-shivir')
.then(console.log('MongoDB connected succesfully..'))



app.listen(3000,()=>{
    console.log("App Listening at 3000...")
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/new',(req,res)=>{
    res.render('./campgrounds/new')
})



app.get('/camps',async(req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('./campgrounds/index', {campgrounds})
})

app.get('/camps/:id',async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    res.render('./campgrounds/show',{campground})
})
