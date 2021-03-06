import React from "react";
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  
  render () {
    const {movie, onBackClick} = this.props;

    return (
      <div className="movie-view bg-light text-black" style={{marginTop: 150}} >
        <div className="movie-poster">
          <img src={movie.ImagePath} crossOrigin="true"/>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <Link to={`/genre/${movie.Genre.Name}`}>
            <Button variant='link'>{movie.Genre.Name}</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <Link to={`/director/${movie.Director.Name}`}>
            <Button variant='link' >{movie.Director.Name}</Button>
          </Link>
        </div>
        <button onClick={() => {onBackClick(null); }} variant="outline-dark">Back</button>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      About: PropTypes.string.isRequired,
      Born: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }).isRequired,
}).isRequired,
  onBackClick: PropTypes.func.isRequired
};

