require('dotenv').config()

const express = require('express')


//express app
const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.json({mssg: 'Welcome to the app'})
})

//listen for request
app.listen(process.env.PORT, () => {
    console.log("listening on 4000!")
})  