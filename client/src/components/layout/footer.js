import React from 'react'
import {Link} from 'react-router-dom'

const footer = () => {
  return (
    <div className="bg-dark text-light p-3 ">
      <h1 className="text-center">
        All Rights Reserved 
      </h1>
      <p className='footer'>
        <Link to="/about"> || About ||</Link>

        <Link to="/contact">Contact ||</Link>

        <Link to="/policy">Privacy Policy ||</Link>


      </p>

    </div>
  )
}

export default footer
