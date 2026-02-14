const express = require('express');
const app = express()
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const connectDatabase = require('./config/connect.database')


const authRoute = require('./routes/auth.route')
const postRoute = require('./routes/post.route')
const socalRoute = require('./routes/socalActivity.route')
const storyRoute = require('./routes/story.route')

const PORT = process.env.PORT || 3000

// CORS config for credentials
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser());

connectDatabase();



app.use('/auth',authRoute)
app.use('/post',postRoute)
app.use('/social',socalRoute)
app.use('/story',storyRoute)

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running in ${PORT}`)
})