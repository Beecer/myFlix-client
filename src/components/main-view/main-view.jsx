import React from "react";
import axios from "axios";
import { Col, Row, Button } from "react-bootstrap"; 


import { LoginView } from "../login-view/login-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {

  constructor() {
    super();
      this.state ={
        movies: [],
        selectedMovie: null,
        user: null
      };
    }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    })

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    })
  }

  getMovies(token) {
    axios.get('https://mymoviesapp775.herokuapp.com/movies', {
      headers: {Authorization: `Bearer ${token}`}
    })
    .then(response => {
      //Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
      .catch(function (error) {
        console.log(error)
      
    });
  }

  render() {
    const {movies, selectedMovie, user} = this.state;

  /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
    if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
  
    //Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;
  
    return (
      <Container>
      <row className="main-view justify-content-md-center">
        {/*IF the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); } } />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie); } } />
          ))}
      <Button variant="outline-dark" onClick={() => { this.onLoggedOut(); } }>Logout</Button>
            </row>
        </Container>
    );
  }
}


export default MainView;
