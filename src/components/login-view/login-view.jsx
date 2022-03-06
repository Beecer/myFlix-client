import React, {useState} from "react";
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* send a request to the servere for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username)
  };

    return (

      <form>
        <form>
        <label>
          Username: 
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>
          Password: 
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>LogIn</button>
      </form> 
        <form>
        <button type="submit" onClick={handleSubmit}>Register</button>
        </form>
      </form>
    );
  }

LoginView.propTypes = {
  user: PropTypes.shape ({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired,
}