import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <div className='errorSection'>
    <Link to="/" style={{ fontSize: '1rem', color: 'darkblue',  }}>
     <p>Go Back</p>
    </Link>
      <h1>404</h1>
      <p>Page Not Found</p>
    </div>
    </>
    
  )
}

export default NotFound
