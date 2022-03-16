import React from "react";  
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap';

import './movie-card.scss';
import { CardGroup } from "react-bootstrap";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick} = this.props;

    return ( 
      <CardGroup>
      <Card className="bg-light text-black" border='danger' style={{ width: '14rem', height: '15rem',margin: '.5rem' }}>
        <Card.Body>
          <Card.Img  src={movie.ImagePath} />
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{movie.Year}</Card.Subtitle>
          <Button onClick={() => onMovieClick(movie)} variant="outline-dark">Details</Button>
        </Card.Body>
      </Card>
      </CardGroup>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};