require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')
const handleError = require('./middleware/handleError')
const morgan = require('morgan')
const PORT = process.env.PORT || 4000;

const app = express()

// middlewares
app.use(bodyParser.json({limit:"30mb", extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}))
app.use(cors())

// Logger
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// routes
app.use('/api/reviews', reviewRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to backend API')
})

handleError(app);

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
