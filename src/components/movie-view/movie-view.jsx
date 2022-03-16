import React from "react";
import PropTypes from 'prop-types';
import {  Button, Card } from "react-bootstrap";


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
      <Card className=" bg-light text-black" border='danger' style ={{width: '60rem', height: '30rem', marginTop: '10rem'}}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
        <Card.Title >{movie.Title}</Card.Title>
        <Card.Subtitle className="mb-4 text-muted">{movie.Description}</Card.Subtitle>
        <Card.Subtitle className="mb-2 ">{movie.Genre.Name}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">{movie.Genre.Description}</Card.Subtitle><br/>
        <Card.Subtitle className="mb-4">Director: {movie.Director.Name}</Card.Subtitle>
        <Button onClick={() => onBackClick(null)} variant="outline-dark">Back</Button>
      </Card.Body>
      </Card>
    )
  }
};

MovieView.propTypes={
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired

};

export default MovieView;