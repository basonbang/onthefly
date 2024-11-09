import GithubStrategy from 'passport-github2';
import { pool } from './database.js';

const options = {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/github/callback'
}

// Handle authentication process after user is redirected back to app
const verify = async (accessToken, refreshToken, profile, callback) => {
  const { _json: { id, name, login, avatar_url } } = profile;
  const userData = {
    githubId: id,
    username: login,
    avatarUrl: avatar_url,
    accessToken
  }

  try {
    const query = `SELECT * FROM users WHERE username = $1`
    const results = await pool.query(query, [userData.username])
    const user = results.rows[0]

    if (!user) {
      const insertQuery = `INSERT INTO users (githubid, username, avatarurl, accesstoken) VALUES ($1, $2, $3, $4) RETURNING *`
      const results = await pool.query(insertQuery, [userData.githubId, userData.username, userData.avatarUrl, userData.accessToken])
      const newUser = results.rows[0]
      return callback(null, newUser)
    }

    return callback(null, user)
  } catch (error) {
    return callback(error)
  }
}
export const Github = new GithubStrategy(options, verify)