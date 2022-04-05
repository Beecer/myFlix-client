import React, { useState, useEffect } from "react";
import {  Button } from "react-bootstrap";
import axios from "axios";
import './profile-view.scss';

import {UserData} from './user-data';
import {UpdateUser} from './update-user';
import {FavoriteMovies} from './favorite-movies';


export function ProfileView(props) {

  const [userdata, setUserdata] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
 

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (cancelToken, username) => {
    axios.get(`https://mymoviesapp775.herokuapp.com/users/${username}`, {
      cancelToken: cancelToken
    })
      .then(response => {
        setUserdata(response.data);
        setFavoriteMoviesList(props.movies.filter(m => response.data.FavoriteMovies.includes(m._id)));
      })
      .catch(err => {
          console.log(err);
      })
  }

  useEffect(() => {
    let source = axios.CancelToken.source();

    if (token !== null) {
      getUserData(source.token, props.user);
    } else {
      console.log('Not Authorized');
    }

    return() => {
      source.cancel();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://mymoviesapp775.herokuapp.com/users/${userdata.Username}`, updatedUser)
    .then(response => {
      setUserdata(response.data);
      alert('Profile updated');
    })
    .catch(e => {
      console.log(e);
    });
  }


  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }

  const deleteProfile = (e) => {
    axios.delete(`https://mymoviesapp775.herokuapp.com/users/${userdata.Username}`)
    .then(response => {
      alert('Your profile has beeen deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token')

      window.open('/', '_self');
    })
    .catch(e => {
      console.log(e);
    });
  }

  const removeFav = (id) => {
    axios.delete(`https://femmovies.herokuapp.com/users/${userdata.Username}/movies/${id}`)
        .then(() => {
            // Change state of favoriteMovieList to render component
            setFavoriteMoviesList(favoriteMoviesList.filter(movie => movie._id != id));
        })
        .catch(e => {
            console.log(e);
        });
}


return (
    <>
        {/* Display userdata */}
        <UserData userdata={userdata} />

        {/* Form to update user data */}
        <UpdateUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />

        {/* Button to delete user */}
        <div>
            <Button className="mb-3" variant="danger" type="submit" onClick={deleteProfile}>
                Delete Profile
            </Button>
        </div>

        {/* List of favorite movies */}
        <FavoriteMovies favoriteMoviesList={favoriteMoviesList} removeFav={removeFav} />

        <div>
            <Button variant="outline-danger" onClick={() => { onBackClick();}}>Back to Movies</Button>
        </div>

    </>
);


}