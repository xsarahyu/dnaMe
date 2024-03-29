const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const methodOverride = require('method-override')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')

const analysisRoutes = require('./routes/analysis')
const counselingRoutes = require('./routes/counseling')
const mainRoutes = require('./routes/main')
const profileRoutes = require('./routes/profile')
const settingsRoutes = require('./routes/settings')

// Use .env file in config folder
require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

// Connect to database
connectDB()

// EJS for views
app.set('view engine', 'ejs')

// Static folder
app.use(express.static('public'))

// Body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))

// Use forms for PUT / DELETE
app.use(methodOverride('_method'))

// Setup sessions - stored in MongoDB
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
)

// Middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash messages for errors, info, etc.
app.use(flash())

app.use('/analysis', analysisRoutes)
app.use('/counseling', counselingRoutes)
app.use('/', mainRoutes)
app.use('/home', mainRoutes)
app.use('/profile', profileRoutes)
app.use('/settings', settingsRoutes)

app.listen(process.env.PORT, () => {
  console.log('Server is running')
})