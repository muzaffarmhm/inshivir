const express = require('express')
const app = express()

app.listen(3000,()=>{
    res.send("App Listening at 3000")
})

app.get('/',(req,res)=>{
    res.send('Inshivir Home Page')
})