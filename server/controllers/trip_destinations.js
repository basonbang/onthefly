/**
 * Many to many table
 */

import { pool } from "../config/database";

// insert a new trip destination
export const createTripDestination = async (req, res) => {
  try {
    const { trip_id, destination_id } = req.body
    const results = await pool.query(`
      INSERT INTO trips_destinations (trip_id, destination_id)
      VALUES ($1, $2)
      RETURNING *
      `, [trip_id, destination_id])
      res.status(201).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message}) 
  }
}

// retrieve all trip destinations
export const getTripsDestinations = async (req, res) => {
  try {
    const results = await pool.query(`SELECT * FROM trips_destinations ORDER BY trip_id ASC`)
    res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// retrieve all trips associated with a specific destination
export const getAllTrips = async (req, res) => {
  try {
    // destination id 
    const destination_id = parseInt(req.params.destination_id)
    // join trips and trips_destinations on their trip id's and get rows where destination id matches the id
    const results = await pool.query(`
      SELECT * FROM trips 
      JOIN trips_destinations ON trips.id = trips_destinations.trip_id
      WHERE trips_destinations.destination_id = $1
      `, [id])
      res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}

// retrieve all destinations associated with a specific trip
export const getAllDestinations = async (req, res) => {
  try {
    // trip id
    const trip_id = parseInt(req.params.trip_id)
    const results = await pool.query(`
     SELECT * FROM destinations
     JOIN trips_destinations ON destinations.id = trips_destinations.destination_id
     WHERE trips_destinations.trip_id = $1
      `, [id])
      res.status(200).json(results.rows)
  } catch (error) {
    res.status(409).json({ error: error.message})
  }
}