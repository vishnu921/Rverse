require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')
const PORT = process.env.PORT || 4000;

const app = express()

// middlewares
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

// routes
app.use('/api/reviews', reviewRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to backend API')
})

// connection to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
