import express from 'express'
import cors from 'cors'
import tripRoutes from './routes/trips.js'
import activityRoutes from './routes/activities.js'
import destinationsRoutes from './routes/destinations.js'
import tripDestinationsRoutes from './routes/trip_destinations.js'
import authRoutes from './routes/auth.js'
import userTripRoutes from './routes/users_trips.js'
import passport from 'passport'
import session from 'express-session'
import { Github } from './config/auth.js'

const app = express()

app.use(session({
    secret: 'codepath', // hardcoded to codepath for educational purposes, would be random in actual production
    resave: false,
    saveUninitialized: true // save new and unmodified sessions into the session store
}))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',        // only requests from root domain are allowed to access server
    methods: 'GET, POST, PUT, DELETE, PATCH', 
    credentials: true
}))

// Initialize Passport and use session cookies to remember authenticated users
app.use(passport.initialize())
app.use(passport.session())
passport.use(Github)

// determines what data from user should be stored in the session when user logs in
passport.serializeUser((user, done) => {
    done(null, user)
})

// determines what data stored in the session should be used in request objects
passport.deserializeUser((user, done) => {
    done(null, user)
})

app.get('/', (req, res) => {
    res.status(200).send('<h1 style="text-align: center; margin-top: 50px;">✈️ OnTheFly API</h1>')
})

app.use('/api/trips', tripRoutes)
app.use('/api/activities', activityRoutes)
app.use('/api/destinations', destinationsRoutes)
app.use('/api/trip-destinations', tripDestinationsRoutes)
app.use('/auth', authRoutes)
app.use('/users-trips', userTripRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`)
})
