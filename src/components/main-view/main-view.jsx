import React from "react";
import axios from "axios";

import{ BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoginView } from "../login-view/login-view";
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { ProfileView } from "../profile-view/profile-view";

import Col  from 'react-bootstrap/Col'; 
import Row from 'react-bootstrap/Row';
import Container  from "react-bootstrap/Container";
import { NavbarView } from "../navbar-view/navbar-view";


class MainView extends React.Component {

  constructor() {
    super();
    //Initial State is set to null
      this.state ={
        movies: [],
        user: null
      };
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
    });
  }

  render() {
    const { movies, user } = this.state;
    return (
      <Router>
        <NavbarView user={user} /> 
        <Container>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if(!user) return  <Col>
             <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if(movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>                                             
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
            <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if(!user) return  <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
            if(movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
          }} />

          <Route exact path="/director/:name" render={( { match, history }) => {
            if(!user) return  <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
            if(movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()}/>
            </Col>
          }}/>

          <Route exact path="/genre/:name" render={( { match, history } ) => {
            if(!user) return  <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
            if(movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()}/>
            </Col>
          }} />

          <Route path='/users/:username'
        render={({history, match}) => {
          if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          if(movies.length === 0) return <div className="main-view" />
          return<Col>
          
          <ProfileView history={history} movies={movies} user={user} />
          </Col>
        }} />

          <Route path={'/user-update/${user}'}
        render={({match, history}) => {
          if(!user) return <Redirect to="/" />
          return <Col>
            <UserUpdate user={user}
            onBackClick={() => history.goBack()}/>
          </Col>
        }} />
         </Row>
         </Container>
        </Router> 
          
          );    
        }
      }
      
      export default MainView;