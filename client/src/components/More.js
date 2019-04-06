import React from 'react';
import {Link} from "react-router-dom"


function More() {
  
   return (
      <div>
      <p>
         <Link to='/vgs'> VGS</Link>
      </p>
      <p>
         <Link to='/nebny'> NEBNY</Link>
      </p>
      <p>
         <Link to='/mun'> MUN</Link>
      </p>
      <p>
         <Link to='/tiq'> TIQ</Link>
      </p>
      <p>
      <Link to="/about">About Clubs</Link>
      </p>
      </div>
   )
  }

export default More;