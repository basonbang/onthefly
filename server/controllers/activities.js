import { pool } from "../config/database";

// insert a new activity
export const createActivity = async (req, res) => {
  try {
    // post request, need data from body
    const { trip_id, activity, num_votes }= req.body
    const results = await pool.query(
      `INSERT INTO activities (trip_id, activity, num_votes)
      VALUES ($1, $2, $3)
      RETURNING *
      `, [trip_id, activity, num_votes])
    res.status(201).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// retrieve all activities
export const getActivities = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM activities ORDER BY id ASC`)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// retrieve all activities associated w/ a specific trip
export const getTripActivities = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(`SELECT * FROM activities WHERE trip_id = $1`, [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// update the number of likes for a specific activity
export const updateActivityLikes = async (req, res) => {
  try {
    const id  = parseInt(req.params.id)
    const results = await pool.query(`
      UPDATE activities
      SET num_votes = num_votes + 1
      WHERE id = $1
      `, [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// delete a single activity
export const deleteActivity = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(`DELETE FROM activities where id = $1`, [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}