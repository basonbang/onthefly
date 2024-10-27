import { pool } from "../config/database.js";

// insert a new destination
export const createDestination = async (req, res) => {
  try {
    const {destination, description, city, country, img_url, flag_img_url} = req.body
    const results = await pool.query(`
      INSERT INTO destinations (destination, description, city, country, img_url, flag_img_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `, [destination, description, city, country, img_url, flag_img_url])
    res.status(201).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// retrieve all destinations
export const getDestinations = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM destinations ORDER BY id ASC`)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// retrieve a single destination
export const getDestination = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(`SELECT * FROM destinations where id = $1`, [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// update the details for a single destination
export const updateDestination = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const { destination, description, city, country, img_url, flag_img_url } = req.body
    const results = await pool.query(`
      UPDATE destinations
      SET destination = $1, description = $2, city = $3, country = $4, img_url = $5, flag_img_url = $6
      WHERE id = $7
      `, [destination, description, city, country, img_url, flag_img_url, id])
      res.status(200).json(results.rows)
  } catch (error) {
    res.statius(409).json({ error: error.message})
  }
}

// delete a single destination
export const deleteDestination = async (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const results = await pool.query(`DELETE FROM destinations where id = $1`, [id])
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

export default {
  createDestination,
  getDestinations,
  getDestination,
  updateDestination,
  deleteDestination
}