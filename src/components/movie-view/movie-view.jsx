import React from "react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
    }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  
  render () {
    const {movie, onBackClick} = this.props;

    return (
      <div className="movie-view bg-light text-black" >
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
          <span className="value">{movie.Genre.Name}</span>
          <Link to={`/genres/${movie.Genre.Description}`}>
          <Button variant="link">Details</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">About</Button>
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
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
  }).isRequired,
  Director:PropTypes.shape({
    Name: PropTypes.string.isRequired,
  })
}).isRequired,
  onBackClick: PropTypes.func.isRequired
};

