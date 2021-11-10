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

