import * as React from 'react'
import { Link } from 'react-router-dom'
import { Show } from "./Details";

export const ShowCard = (props: Show) => {
  const { poster, title, year, description, imdbID } = props;
  return (
    <Link to={ `/details/${imdbID}` }>
      <div className='show-card'>
        <img src={ `/public/img/posters/${poster}` } />
        <div>
          <h3>{ title }</h3>
          <h4>({ year })</h4>
          <p>{ description }</p>
        </div>
      </div>
    </Link>
  )
}
