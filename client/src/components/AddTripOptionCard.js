import React from 'react'
import { useParams } from 'react-router-dom';
import './Card.css'


const AddTripOptionCard = (props) =>  {
  const {destination_id} = useParams();
  const trip_id = props.id

  const addToTrip = async (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        trip_id,
        destination_id
      })
    }
    const response = await fetch('http://localhost:3001/api/trip-destinations', options)
    window.location.href = '/'
}

  return (
      <div className="Card" style={{ backgroundImage:`url(${props.img_url})`}} >
        <div className="card-info">
          <h2 className="title">{props.title}</h2>
          <p className="description">{props.description}</p>
          <button className="addToTrip" onClick={addToTrip}>+ Add to Trip</button>
        </div>
      </div>
  );
};

export default AddTripOptionCard;