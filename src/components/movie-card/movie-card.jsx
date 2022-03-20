import React from "react";  
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { CardGroup } from "react-bootstrap";

import './movie-card.scss';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick} = this.props;

    return ( 
      <CardGroup>
      <Card className="bg-light text-black" border='danger' style={{ width: '20rem', height: '20rem',margin: '.5rem' }}>
      <Card.Img  variant="top" src={movie.ImagePath} crossOrigin="true" style={{width: '8rem', height: '12rem'}}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{movie.Year}</Card.Subtitle>
          <Button onClick={() => onMovieClick(movie)} variant="outline-dark" >Details</Button>
        </Card.Body>
      </Card>
      </CardGroup>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};