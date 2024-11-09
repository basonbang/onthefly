import express from "express";
import passport from "passport";

const router = express.Router()

// Route for successful login attempts
router.get('/login/success', (req, res) => {
  if (req.user) {
      res.status(200).json({ success: true, user: req.user })
  }
})

// Route for failed login attempts
router.get('/login/failed', (req, res) => {
  res.status(401).json({ success: true, message: "failure" })
})

// Route for logging out
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    // pass error to next middleware function if logout fails
    if (err) {
      return next(err)
    }

    // clear the session cookie
    req.session.destroy((err) => {
      res.clearCookie('connect.sid')
      res.json({ status: "logout", user: {}})
    })
  })
})

// Route for authentication with Github
router.get('/github', passport.authenticate('github', {
  scope: ['read:user']
}))

// Route for handling callback after Github authentication
router.get('/github/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/destinations',
}))

export default router