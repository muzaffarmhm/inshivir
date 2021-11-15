const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
var methodOverride = require('method-override')
const Campground = require('./models/campground')

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'views'))

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


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

app.post('/campgrounds',async(req,res)=>{
    const campground = req.body
    const campgrounds = new Campground(campground)
    await campgrounds.save()
    res.redirect('/camps')
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

app.get('/camps/edit/:id',async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findById(id)
    res.render('./campgrounds/edit',{campground})
})


app.put('/camps/update/:id',async(req,res)=>{
    const{id} = req.params;
    await Campground.findByIdAndUpdate(id,req.body,{runValidators:true})
    res.redirect(`/camps/${id}`)
})

app.delete('/camps/delete/:id',async(req,res)=>{
    const{id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/camps')
})



