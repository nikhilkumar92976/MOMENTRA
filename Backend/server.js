const express = require('express');
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/connect.database')


const authRoute = require('./routes/auth.route')
const postRoute = require('./routes/post.route')

const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cookieParser());

connectDatabase();



app.use('/auth',authRoute)
app.use('/post',postRoute)

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running in ${PORT}`)
})