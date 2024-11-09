import React from 'react';
import { Link } from 'react-router-dom'

const Login = (props) => {

  const AUTH_URL = `${props.api_url}/auth/github`

  console.log('Auth login page was rendered');
  

  return (
      <div className='Login'>
          <h1>On the Fly ✈️</h1>
          <center>
              <a href={AUTH_URL}>
                  <button className="headerBtn"> 🔒 Login via Github </button>
              </a>
          </center>
      </div>
  )
}

export default Login